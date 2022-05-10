import React from 'react';
import {NavLink} from 'react-router-dom';
import '../styles/Header.css';
//
function Header(){
    return(
        <header className="App-menu" >
            <div className="contenedor_logo">      
                <div className="contenedor_logo_img">
                    <img className='front' src='../img/jovadev.jpg' alt='logo'></img>
                    <div className="back"></div> {/*agregado */}
                </div>
                <label htmlFor="logo" className="nombre_app">Memorama</label>
            </div>
            <ul className="menu_items" id="menu_items">
                <li><NavLink activeClassName="active" to={"/game"}>Jugar</NavLink></li>
                <li><NavLink activeClassName="active" to={{pathname:"/scores"}}>Ganadores</NavLink></li>
                <div className="mi-subfooter">
                    <div><h3>&copy; gasgamdev@gmail.com</h3></div>
                    <div className="mi-github">
                        <a href="https://github.com/jovadev" target="_blank" rel="noreferrer">
                            <i className="fab fa-github" style={{fontSize:"40px"}}></i>
                        </a>
                    </div>
                </div>
            </ul>
            <span className="btn_menu">
            <i className="fas fa-bars"></i>
        </span>
        </header>
    );
}

export default Header;