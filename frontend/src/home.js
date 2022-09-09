import React from 'react';
import Heading from './homepage/heading';
import About from './homepage/about';
import Languages from './homepage/languages';

function Home() {

    return (
        <div className="align-middle">
            <Heading />
            <About />
            <Languages />
        </div>
    );
};
export default Home;