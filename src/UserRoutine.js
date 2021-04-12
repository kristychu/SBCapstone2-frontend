import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import RoutineList from './RoutineList';

function UserRoutine(){
    const token = useSelector(st => st.users.profile.token)
    if(token){
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const username = decoded.username
        return(
            <div>
                <p>Hello {username}!</p>
                <RoutineList/>
            </div>
        )
    }
    return(
        <div>
            <p>You need an account to access this page.</p>
            <p>Have an account already? <Link to="/login">Login!</Link></p>
            <p>Otherwise, <Link to="/register">Register here</Link>.</p>
        </div>
    )
}

export default UserRoutine;