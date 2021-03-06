import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useHistory } from 'react-router';

export const Navbar = () => {

    let location = useLocation();

    let history=useHistory();
    const handleOnLogOut=()=>{
        localStorage.removeItem('token');
        history.push('/login');
    }

    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="./logo192.png" alt="" width="25" height="24" className="d-inline-block align-text-top" />
                        CryptoTracker</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/myalerts" ? "active" : ""}`} to="/myalerts">My Alerts</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>

                        </ul>
                    </div>

                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link to="/login" className="btn btn-lg" tabindex="-1" role="button" aria-disabled="true"><img src="https://cdn1.iconfinder.com/data/icons/30px-enter-login-blue-line/30/26_arrow-access-entrance-login-512.png" alt="" width="30" height="30" className="d-inline-block align-text-top" /></Link>
                        <Link to="/signup" className="btn btn-lg" tabindex="-1" role="button" aria-disabled="true"><img src="https://omolewaaa.github.io/Hello-Books/images/signup.png" alt="" width="30" height="30" className="d-inline-block align-text-top" /></Link>
                    </form> :
                        <div>
                            <button className="btn btn-warning" onClick={handleOnLogOut}>LogOut</button>
                        </div>
                    }

                </div>
            </nav>

        </div>
    )
}
