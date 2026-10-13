import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating "N" dev-mode badge; compile and runtime errors still show.
  devIndicators: false,
};

export default nextConfig;
