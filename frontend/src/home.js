import React from 'react';
import Heading from './homepage/heading';
import About from './homepage/about';
// import Languages from './homepage/languages';

function Home() {

    const url = process.env.REACT_APP_BASE_URL;

    console.log(url);

    return (
        <div className="align-middle">
            <Heading />
            <About />
        </div>
    );
};
export default Home;