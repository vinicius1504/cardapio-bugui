"use client"; 
import Header from "../../components/layout/Header-Footer/Header";
import SecaoMenu from "../../components/layout/Session Menu/SecaoMenu";
// import { produtos } from "./data/produtosL";
import Footer from "../../components/layout/Header-Footer/Footer";
import ThemeClientWrapper from "../../components/layout/themeComponent/ThemeClientWrapper";
import { useTheme } from "../../hooks/useTheme"; // Importa o hook que aplica o tema

export default function Home() {
useTheme(); // Aqui aplica o tema dinâmico

  return (
	<ThemeClientWrapper>
	<main className="flex flex-col min-h-screen bg-[#fff1e6]">
	 {/* <- Aqui aplica as cores */}
	  <Header />
	  <section className="text-center py-10 text-red-800 text-xl font-medium">
		Conheça nosso menu 🍔
	  </section>
	  <SecaoMenu />
	  <div className="mt-auto">
		<Footer />
	  </div>
	</main>
	</ThemeClientWrapper>
  );
}
