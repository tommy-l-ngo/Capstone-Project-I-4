import React from 'react';
import '../Dashboard.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Navbar from '../Navbar';

function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Cards />
        </>
    );
}

export default Home;