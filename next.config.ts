import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.themealdb.com", "www.thecocktaildb.com"], // adicione outros domínios se necessário
  },
};

export default nextConfig;
