/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images2.imgbox.com", // Keep this if you still need this domain
      },
      {
        protocol: "https",
        hostname: "i.imgur.com", // Add this line for imgur
      },
    ],
  },
};

export default nextConfig;
