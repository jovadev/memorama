import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/PageNotFound.css";
const PageNotFound = () => {
  return (
    <main className="contenedor">
      <div className="div_no_encontrada">
      <div className="no_encontrada">
        <h1>Oooops...</h1>
        <h2>Página No encontrada</h2>
        <div id="redirect_game">
          <NavLink activeClassName="active" to={"/game"}>Ir aJugar</NavLink>
        </div>
        <div>
          <img
            src="../img/pagenotfound.jpg"
            alt="notfound"
          />
        </div>
      </div>
    </div>
    </main>
  );
};

export default PageNotFound;
