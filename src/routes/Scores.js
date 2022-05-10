import React from 'react';
import {db} from '../config/basedatos';
//importo los metodos que me van a permitir leer datos
import {collection,getDocs} from 'firebase/firestore';

import '../styles/Scores.css';
function Registro(props){
  return (<tr>
            <td><h3>{props.id}</h3></td> 
            <td id="td_usuario"><h3>{props.usuario}</h3></td>
            <td><h3>{props.tiempo}</h3></td> 
            <td><h3>{props.fecha}</h3></td>
          </tr>);
}
function Cargando(props){
  return (
    <div className="cargando">
      <div className="div-cargando">
        <label>{props.vacio?'No hay registros guardados.':
          props.err?"Hubo un error, no se pudieron cargar los resultados":"Cargando resultados..."}
        </label>
      </div>
    </div>
    );
}
function formatoTiempo(tiempoS){
  let segundos=tiempoS%60;
  let minutos=(tiempoS-segundos)/60;
  minutos=minutos<10?"0"+minutos:minutos;
  segundos=segundos<10?'0'+segundos:segundos;
  return (minutos+':'+segundos);
}
class Scores extends React.Component{
  constructor(props) {
    super(props);
    this.state={datos:[],error:null,vacio:false};
  }
  async componentDidMount(){
    await this.obtieneDatos();//devuelve array de objetos
  }
  async obtieneDatos(){
    let data=[]
    const col=collection(db,"scores");
    try{
      const docs=await getDocs(col);
      //console.log(docs);
      //console.log(docs.size);
      docs.forEach(doc=>{
        //console.log(doc.id);
        data.push({...doc.data(),id:doc.id});
      });
      data.sort((a,b)=>a.tiempoS-b.tiempoS);
      this.setState({datos:data,vacio:docs.empty});  
    }catch(error){
      this.setState({error:error});
    }
  }

  render(){
      let listaRegistros=this.state.datos.map((dato,i)=>{
          let fecha=new Date(dato.fecha.seconds*1000);
          let tiempo=formatoTiempo(dato.tiempoS);
          return <Registro key={i} id={i+1} usuario={dato.usuario} tiempo={tiempo}
           fecha={fecha.toLocaleDateString()} />;
      });
    return(
      <main className="contenedor">
          <h1 id="titulo_scores">Lista de ganadores</h1>
        {listaRegistros.length===0?<Cargando err={this.state.error} vacio={this.state.vacio}/>:
        <div className="scores">
        <div className="scores_table">
        <table>
          <tbody>
          <tr>
            <th><h2>#</h2></th>
            <th><h2>Nombre</h2></th>
            <th><h2>Tiempo</h2></th>
            <th><h2>Fecha(dd/MM/YYYY)</h2></th>
          </tr>
            {listaRegistros}  
          </tbody>
        </table>
        </div>
        </div>
        }
        
      </main>
    );
  }
}

export default Scores;

