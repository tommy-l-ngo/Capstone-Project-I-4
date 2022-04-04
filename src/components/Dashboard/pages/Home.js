import React, {useEffect} from 'react';
import '../Dashboard.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Navbar from '../Navbar';

function Home() {

      useEffect(() => {
        // Update the document title using the browser API
        document.body.style.overflowY = "scroll";
    });



    return (
        <>
            <Navbar />
            <HeroSection />
            <Cards />
        </>
    );
}

export default Home;