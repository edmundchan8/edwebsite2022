import React from 'react'
import '../index.css';
import profilePic from '../images/profilePic.jpeg'


function Heading(){

    const url = process.env.REACT_APP_BASE_URL;

    console.log(url);
    console.log('test');

    return(
        <div>
            <header>
                <h1>Chi Hong Edmund Chan</h1>
                <h3>Web Application Developer</h3>
                <img src={profilePic} className="logo" alt="me" />
                <h4>Test</h4>
                <h5>{process.env.REACT_APP_BASE_URL}</h5>
            </header>   
        </div>
        
    )
}

export default Heading