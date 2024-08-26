/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";

export default (phase) => {
  const nextConfig = {
    basePath: isProduction ? "/2024" : undefined,
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    output: phase === "phase-production-build" ? "export" : "standalone",
  };
  return nextConfig;
};
