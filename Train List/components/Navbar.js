import React, {Component } from 'react';

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li className="brand-logo center">FP Tech Assignment</li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;