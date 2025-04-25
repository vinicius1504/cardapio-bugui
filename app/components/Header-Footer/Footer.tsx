export default function Footer() {
	return (
	  <footer className="bg-red-700 text-white text-center py-6 mt-10">
		<div className="max-w-4xl mx-auto px-4 space-y-1 text-sm">
		  <p>&copy; {new Date().getFullYear()} Red Burguer. Todos os direitos reservados.</p>
		  <p>Rua dev sucesso, 12 – Campo Grande, MS</p>
		  <p>Funcionamento: Seg à Dom – 18:00 às 22:00</p>
		</div>
	  </footer>
	);
  }
  	