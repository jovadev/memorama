import React from "react";
//import Casilla from "./Casilla";
import "../styles/Tablero.css";
import "../styles/Casilla.css";
const interrogacion="../img/interrogacion.jpeg"; 
const imagenes=[
  {nombre:"perro",ruta:'/img/perro.jpg'},
  {nombre:"gato",ruta:'/img/gato.jpg'},
  {nombre:"araña",ruta:'/img/araña.jpeg'}, 
  {nombre:"arenita",ruta:'/img/arenita.jpg'},
  {nombre:"puma",ruta:'/img/puma.jpg'},
  {nombre:"cuervo",ruta:'/img/cuervo.jpg'}, 
  {nombre:"patricio",ruta:'/img/patricio.jpg'},
  {nombre:"catdog",ruta:'/img/catdog.jpg'},
];
let rutasImg=imagenes.map((imagen)=>imagen.ruta);
export default function Tablero (props){
    const baraja=props.baraja.map((fila,f)=>{
      return    fila.map((carta,c) => {
              return  <Casilla
                  onClick={() =>props.onClick(f,c)}
                  src={carta.src}
                  alt="imagen"
                  key={`${f}-${c}`}  
                  disabled={carta.seleccionada}
                  indice={carta.indiceCarta}
                />
          });     
        });
    return (
        <section className="tablero">
          {baraja}
        </section>
    );
}
function Casilla(props) {
  
  return (
    <button className={props.disabled?"casilla otro":'casilla'} onClick={props.onClick} 
    disabled={props.disabled}>
    <img src={props.disabled?rutasImg[props.indice]:interrogacion} alt={props.alt}/>
  </button> 
     
  );
}
//"/img/araña.jpeg"
