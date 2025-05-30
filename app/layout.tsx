import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/.styles/globals.css";
import Carrinho from "@/.components/layout/Shoppingcart/Carrinho";
import { CarrinhoProvider } from "@/.components/layout/Shoppingcart/CarrinhoContext";
// import { useTheme } from "@/hooks/useTheme"; // Importa o hook que aplica o tema
import ThemeClientWrapper from "@/.components/layout/themeComponent/ThemeClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CarrinhoProvider>
          {children}
          <Carrinho />
        </CarrinhoProvider>
      </body>
    </html>
  );
}
