import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" activeClassName='active' to="/">WYR:</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' to='/home'>Questions</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' to='/add'>Add Question</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' to='/leaderboard'>Leaderboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' to='/logout'>Log Out</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}