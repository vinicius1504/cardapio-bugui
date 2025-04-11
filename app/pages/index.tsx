import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
	return (
		<div>
			<Header />
			<main>Bem-vindo ao site!</main>
			<Footer />
		</div>
	);
};

export default Home;
