import React from 'react'
import '../index.css';
import profilePic from '../images/profilePic.jpeg'


function Heading(){

    return(
        <div>
            <header>
                <h1>Chi Hong Edmund Chan</h1>
                <h3>Web Application Developer</h3>
                <p>Trying to get app working in production</p>
                <img src={profilePic} className="logo" alt="me" />
            </header>   
        </div>
        
    )
}

export default Heading