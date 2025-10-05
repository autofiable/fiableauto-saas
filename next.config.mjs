/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ignore les erreurs ESLint en build (Vercel)
  },
};

export default nextConfig;
