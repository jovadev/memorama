import React from 'react';
const Inicio=(props)=>{
    setTimeout(()=>{
        props.history.push('/game',{nombre:'Anonimo'});
    },200);
    return (
        <main className="contenedor">
            <div className="home">
            <h1>Bienvenid@!</h1>
            </div>
        </main>
    );
}
export default Inicio;
            