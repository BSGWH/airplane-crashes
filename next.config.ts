import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.jetphotos.com",
            },
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            },
            {
              protocol:"https",
              hostname:"tailstrike.com",
            }
        ],
    },
};

export default nextConfig;
