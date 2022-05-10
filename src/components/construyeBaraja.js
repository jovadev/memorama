//import shuffle from 'lodash.shuffle';
const COLUMNAS=4;
export default function construyeBaraja(){
let cartas=[];
for(let j=0;j<2;j++) {
  for(let i=0;i<8;i++){
    const carta = {
      indiceCarta:i,
      seleccionada: false,
    };
    cartas.push(carta);
  }
}
let cartasDividida=[];
//shuffle(cartas)
cartas.sort(function() {return Math.random() - 0.6});
for(let i=0;i<cartas.length;i+=COLUMNAS){
  cartasDividida.push(cartas.slice(i,i+COLUMNAS));
}
return cartasDividida;
}

