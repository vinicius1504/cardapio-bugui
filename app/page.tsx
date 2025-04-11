import Header from "./components/Header";
import SecaoMenu from "./components/SecaoMenu";
// import { produtos } from "./data/produtosL";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-red-50">
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
