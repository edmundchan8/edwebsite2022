import React from 'react';
import AppRoutes from './appRoutes';
import Heading from './homepage/heading';
import About from './homepage/about';
import Languages from './homepage/languages';


function App() {
    return (
        <div className="align-middle">
            <AppRoutes />
            <Heading />
            <About />
            <Languages />
        </div>
    );
};
export default App;