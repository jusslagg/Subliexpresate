/** @type {import('next').NextConfig} */
const repoName = "Subliexpresate";
const isVercel = process.env.VERCEL === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isVercel ? "" : `/${repoName}`);

const nextConfig = {
  output: "export",
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
