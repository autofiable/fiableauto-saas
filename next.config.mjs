/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactive les erreurs ESLint pendant le build Vercel
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
