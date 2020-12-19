import React from 'react';
import { NavLink } from 'react-router-dom';


function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{marginBottom: '30px'}}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to='/'>CRIME</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/upload'>Upload</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/record'>Record</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}


export default Navbar;
