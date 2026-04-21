import NextAuth, { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { generateApiKey } from "@/lib/generate-key";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking:true
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking:true
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "",
  
  events: {
    async createUser({ user }) {
      if (!user.email) return;

      const base = user.email
        .split("@")[0]
        .replace(/[^a-z0-9]/gi, "")
        .toLowerCase();
      
      const suffix = Math.random().toString(36).slice(2, 6);
      const username = `${base}_${suffix}`;

      await prisma.user.update({
        where: { id: user.id },
        data: {
          username,
          apiKeys: {
            create: {
              key: generateApiKey(),
              name: "Default Key",
            },
          },
        },
      });
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: {
            id: true,
            username: true,
          },
        });
        
        if (dbUser) {
          token.username = dbUser.username;
        }
      }
      
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string; // ✅ Now TypeScript knows about username
      }

      if (session.user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            username: true,
          },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.name = dbUser.name;
          session.user.email = dbUser.email;
          session.user.image = dbUser.image;
          session.user.username = dbUser.username; // ✅ This will work now
        }
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };