import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {db} from "../config/basedatos";
import {setDoc,doc} from 'firebase/firestore';
import "../styles/Resultado.css";
const TIEMPO_MAX=300;
function Resultado(props) {
  const [user, setUser] = useState("");
  const [isSave,setSave]=useState(false);
  const handleInputChange = (event) => {
    setUser(event.target.value);
  };
  function Form() {
    if(!isSave){
    return (
        <div className="div_entrada">
            <div className="entrada">
                <label>Para guardar tu registro introduce tu nombre:</label>
                <br></br>
                <input  type="text" name="user" onChange={handleInputChange}
                    placeholder="Tu nombre..."  autoComplete="off" value={user}
                    autoFocus maxLength={15}
                />
                <br></br>
                <button className='btn_nombre' onClick={()=>generaDoc()}>Aceptar</button>
            </div>
        </div>
        ); 
    }else{
        return (
            <div className="div_entrada">
              <div className="entrada">
                <h3>{isSave?"Se guardó el registro":"Error, No se guardó..."}</h3>
              </div>
            </div>
        )
    }
  }
  function Botones(){
      return(
        <div className="div_buttons">
            <button onClick={props.onClick} className="reinicioA">Volver a jugar</button>
            <button className="ver_ganadores"><NavLink to="/scores">Ver Ganadores</NavLink></button>
        </div>
      );
  }
  function generaDoc() {
    if(!user.trim() || user.length>15){ return }
    let jugadas = props.intentos + props.aciertos;
    let usuario=user.charAt(0).toUpperCase() + user.substring(1);
    let numId =usuario + "_" + props.intentos + "_" + jugadas + "_" + props.tiempo;
      const refDoc=doc(db,"scores",numId);
      setDoc(refDoc,{
        fecha: new Date(),
        tiempoS: props.tiempo,
        usuario: usuario,
      }).then(()=>{
        setSave(true);
      })
      .catch(error=>{
       console.log('error en escritura');
      });
  }
  const ganador = props.ganador;
  let segundos = props.tiempo % 60;
  let minutos = (props.tiempo - segundos) / 60;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;
  return (
    <div id="miModal" className={`modal-resultado ${props.mostrar && 'mostrar'}`}>
      <div className="modal-contenido">
        {ganador || <h3>{props.tiempo>=TIEMPO_MAX?'Se te agotó el tiempo': "Agotaste tus oportunidades!"}</h3>}
        <h3>{ganador ? "Lo has logrado!" : "Sigue intentado..."}</h3>
        <h3>Tiempo: {minutos}:{segundos}</h3>
        {ganador && <Form /> }
        <Botones />
      </div>
    </div>
  );
}

export default Resultado;
