// components/ThemeClientWrapper.tsx
"use client";
import { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeClientWrapper({ children }: { children: React.ReactNode }) {
  const { loading } = useTheme();

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando tema...</p>
      </div>
    );
  }

  return <>{children}</>;
}
