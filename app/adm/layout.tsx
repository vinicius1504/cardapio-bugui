"use client";

import { ReactNode } from "react";
import NavBarAdm from "@/components/layout/adm/NavBarAdm";

interface AdmLayoutProps {
  children: ReactNode;
}

export default function AdmLayout({ children }: AdmLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <NavBarAdm />
      <main className="flex-1 p-4 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
