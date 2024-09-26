/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProduction ? "/2024" : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  output: "export",
  experimental: { esmExternals: "loose" },
};

export default nextConfig;
