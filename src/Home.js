import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';

function SkincareAppHome(){
    const token = useSelector(st => st.users.profile.token)
    if(token){
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const username = decoded.username
        return(
            <div>
                <h2>Welcome back to the Korean Skincare App, {username}! </h2>
                <p>We're excited for you to join us!</p>
                <Link to="/user-routine"><Button color="success">Get Started</Button></Link>
            </div>
        )
    }
    return(
        <div>
            <h2>Welcome to the Korean Skincare App</h2>
            <p>Track your skincare products for each step of the <Link to="/korean-skincare-routine">Korean Skincare Routine!</Link></p>
            <p>Have an account already? <Link to="/login">Login!</Link></p>
            <p>Otherwise, <Link to="/register">Register here</Link>.</p>
        </div>
    )
}

export default SkincareAppHome;