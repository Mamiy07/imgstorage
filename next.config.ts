import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains:['lh3.googleusercontent.com', 'avatars.githubusercontent.com']
  },
  experimental:{
    staleTimes:{
      dynamic:300,
      static:3600
    }
  }
};

export default nextConfig;
