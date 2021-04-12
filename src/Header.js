import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './actions';
import './Header.css';

function Header(){
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleLogout = evt => {
        evt.preventDefault();
        dispatch(logout());
        history.push('/')
      };

    const token = useSelector(st => st.users.profile.token);
    if(token){
        return (
        <div className="Header">
            <h1>Korean Skincare App</h1>
            <nav>
                <NavLink exact to="/">
                    Home
                </NavLink>
                <NavLink exact to="/korean-skincare-routine">
                    The Routine
                </NavLink>
                <NavLink exact to="/user-routine" className="logged-in">
                    Your Routine
                </NavLink>
                <NavLink exact to="/logout" className="logged-in" onClick={handleLogout}>
                    Logout
                </NavLink>
            </nav>
        </div>
        )
    }
    return (
        <div className="Header">
            <h1>Korean Skincare App</h1>
            <nav>
                <NavLink exact to="/">
                    Home
                </NavLink>
                <NavLink exact to="/korean-skincare-routine">
                    The Routine
                </NavLink>
                <NavLink exact to="/register">
                    Register
                </NavLink>
                <NavLink exact to="/login">
                    Login
                </NavLink>
            </nav>
        </div>
      );
}

export default Header;