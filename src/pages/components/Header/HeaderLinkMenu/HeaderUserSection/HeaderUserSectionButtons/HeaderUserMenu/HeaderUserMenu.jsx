import React from 'react';
import './HeaderUserMenu.scss';
            
export default function HeaderUserMenu() {
    return (
        <div id='user-menu'>
            <button className="user-meun-button">Profile</button>
            <div className='split-line'></div>
            <button className="user-meun-button">Settings</button>
            <div className='split-line'></div>
            <button className="user-meun-button">Log Out</button>
        </div>
    );
}
