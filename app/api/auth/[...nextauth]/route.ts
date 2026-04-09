
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
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET || '',
//   pages: { signIn: '/login' },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false
      try {
        const existing = await prisma.user.findUnique({
          where: { email: user.email },
          include: { apiKeys: true },
        })

        if (existing && existing.apiKeys.length === 0) {
          // Auto create first API key on signup
          const base = user.email
            .split('@')[0]
            .replace(/[^a-z0-9]/gi, '')
            .toLowerCase()
          const suffix = Math.random().toString(36).slice(2, 6)

          await prisma.user.update({
            where: { email: user.email },
            data: {
              username: `${base}_${suffix}`,
              apiKeys: {
                create: {
                  key: generateApiKey(),
                  name: 'Default Key',
                },
              },
            },
          })
        }
      } catch (e) {
        console.error('signIn error:', e)
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },

    async session({ session, token }) {
      if (!session.user?.email) return session

      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, name: true, email: true, image: true, username: true },
      })

      if (dbUser) {
        session.user.id = dbUser.id
        session.user.name = dbUser.name
        session.user.email = dbUser.email
        session.user.image = dbUser.image
      } else if (token.id) {
        session.user.id = token.id as string
      }

      return session
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
