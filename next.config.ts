// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Laisse passer les warnings/erreurs ESLint en prod (Vercel)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
