import React from "react";
import obtieneBaraja from "./construyeBaraja";
import Tablero from './Tablero';
import Panel from './Panel';
import Resultado from './Resultado';
const MAX_INTENTOS=8;
const TIEMPO_JUEGO_MAX=300;
const TIEMPO_VOLTEO=600;
const estadoInicial=()=>{
  const baraja=obtieneBaraja();//array de array de objetos. 4 columnas, 16 elementos
  return {
    baraja:baraja,
    aciertos:0,
    intentos:0,
    tiempo:0,
    ver:false
  };
}
class Memorama extends React.Component {
  constructor(props) {
    super(props);
    this.state=estadoInicial();
    this.contador=null;
    this.iniciado=false;
    this.esperaTimeout=false;
    this.posicion1=this.posicion2=null;
  }
  reiniciar(){
    this.posicion2=this.posicion1=null;
    this.iniciado=false;
    this.stopTimer();
    this.setState(estadoInicial());
  }
  volteaCarta(f,c) {
    if(this.esperaTimeout){return;}
    let baraja=this.state.baraja;
    //iniciando el juego y el tiempo de juego
    if(!this.posicion1 && !this.iniciado){
      this.initTimer(); 
      this.iniciado=true;
    }
    //cuando se selecciona una volteada
    if(baraja[f][c].seleccionada===true){return;}
    //asigna las posiciones de la carta seleccionada a un array
    this.posicion1===null?this.posicion1=[f,c]:this.posicion2=[f,c];
    let nuevaBaraja=baraja.map((fila,fil)=>{
     let filaNueva=fila;
      if(fil===f){
       filaNueva=fila.map((carta,col)=>{
          return col===c? {...carta,seleccionada:true}:{...carta};
        });
      }
      return filaNueva;
    });
    //console.log("this.posicion1:",this.posicion1,"--this.posicion2:",this.posicion2);
    this.setState({ baraja: nuevaBaraja});
  }
  
  verificaPareja(){
    const baraja=this.state.baraja;
    let aciertos=0,intentos=0;
    this.esperaTimeout=true;
    let [f1,c1]=this.posicion1;
    let [f2,c2]=this.posicion2;
    let nuevaBaraja=[];
    //console.log("f1:",f1,"-c1:",c1,"-----","f2:",f2,"-c2:",c2);
    let pareja=baraja[f1][c1].indiceCarta===baraja[f2][c2].indiceCarta;
    pareja?aciertos++:intentos++;
    
    setTimeout(()=>{
      console.log("estoy en settimeout");
      nuevaBaraja=baraja.map((fila,fil)=>{
          return fila.map((carta,col)=>{
            if((col===c1 && fil===f1)||(col===c2 && fil===f2)){
              console.log('co');
              return pareja?{...carta}:{...carta,seleccionada:false}
            }else{  return {...carta}  }
            });            
       });
       this.setState((state)=>({
         baraja:nuevaBaraja,
         aciertos: state.aciertos+aciertos,
         intentos: state.intentos+intentos,
        }));
      this.posicion1=this.posicion2=null;
      this.esperaTimeout=false;
    },TIEMPO_VOLTEO); 
  }
  componentDidUpdate(prevProps,prevState){
    if(this.posicion1!==null && this.posicion2!==null && !this.esperaTimeout){
      console.log('VERIFICAR PAREJA');
      this.verificaPareja();
    }
  }
  verificaBaraja(){
    let baraja=this.state.baraja;
    return baraja.every((fila)=>fila.every((carta)=>carta.seleccionada===true));
  }
  initTimer() {
      this.contador = setInterval(() => {
        this.setState({ tiempo: this.state.tiempo + 1 });
      }, 1000);
  }
  stopTimer() {
    clearInterval(this.contador);
    this.contador = null;
  }
  render() {
    let {aciertos,intentos,tiempo}=this.state;
    let ganador=this.verificaBaraja();
    let mostrarResultado=false;
    if(intentos===MAX_INTENTOS || ganador || this.state.tiempo>=TIEMPO_JUEGO_MAX){  
      console.log('a detenerse')
      this.stopTimer();
      mostrarResultado=true;
    }
    return (
      <div className="container_gameboard">
        <Panel 
          intentos={intentos} 
          aciertos={aciertos}
          onClick={()=>this.reiniciar()}         
          tiempo={tiempo}
       />
        <Tablero 
          baraja={this.state.baraja}
          onClick={(f,c)=>this.volteaCarta(f,c)}
        />
      
        <Resultado 
        aciertos={aciertos} 
        intentos={intentos} 
        ganador={ganador}
        tiempo={tiempo}
        onClick={()=>this.reiniciar()}
        mostrar={mostrarResultado}
        />
      </div>
    );
  }
}

export default Memorama;