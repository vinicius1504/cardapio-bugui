import Header from "../../components/Header-Footer/Header";
import SecaoMenu from "../../components/Session Menu/SecaoMenu";
// import { produtos } from "./data/produtosL";
import Footer from "../../components/Header-Footer/Footer";

export default function Home() {
  return (
	<main className="flex flex-col min-h-screen bg-[#fff1e6]">
	  <Header />
	  <section className="text-center py-10 text-red-800 text-xl font-medium">
		Conheça nosso menu 🍔
	  </section>
	  <SecaoMenu />
	  <div className="mt-auto">
		<Footer />
	  </div>
	</main>
  );
}
