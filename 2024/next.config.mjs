/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProduction ? "/2024" : undefined,
  ttrailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
