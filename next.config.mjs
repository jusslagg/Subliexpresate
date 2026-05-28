/** @type {import('next').NextConfig} */
const repoName = "Subliexpresate";

const nextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
