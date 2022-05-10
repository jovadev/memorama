import React from "react";
import "../styles/Tablero.css";
const MAX_INTENTOS = 8;
function Panel(props) {
    let tiempo =formatoTiempo(props.tiempo);
  return (
    <section className="panel">
      <section className="status">
        <div className="marcadores">
          <h4>Intentos: {props.intentos}/{MAX_INTENTOS}</h4>
          <h4>Aciertos:{props.aciertos}</h4>
          <h4>Tiempo: {tiempo}</h4>
        </div>
        <div className="reinicio">
          <button onClick={props.onClick} disabled={props.tiempo===0?true:false}>Reiniciar</button>
        </div>
      </section>
      <div className="panel_nota">
        <p>El tiempo inicia cuando voltees la primer carta</p>
      </div>
    </section>
  );
}
function formatoTiempo(tiempoS){
  let segundos=tiempoS%60;
  let minutos=(tiempoS-segundos)/60;
  minutos=minutos<10?"0"+minutos:minutos;
  segundos=segundos<10?'0'+segundos:segundos;
  return (minutos+':'+segundos);
}

export default Panel;
