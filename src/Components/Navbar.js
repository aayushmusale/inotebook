import React, { useEffect } from 'react'
import {useLocation, Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
    let location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
    <div>
        <nav className="navbar navbar-dark navbar-expand-lg  bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><b>iNoteBook</b></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} aria-current="page" href="/about">About</a>
                        </li>



                    </ul>
                    {!localStorage.getItem("token") ? <form className="d-flex" role="search">
                    <Link className="btn btn-primary mx-2" to="/login" role="button" >Login</Link>
                    <Link className="btn btn-primary mx-2" to="/signup" role="button" >Signup</Link>                        
                    </form>:  <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    </div>
    )
}

export default Navbar
