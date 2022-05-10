import React,{useEffect} from 'react';
import '../styles/Footer.css';
function Footer(){
    useEffect(()=>{
        console.log('FOOTER montado');
      });
    let year=new Date().getFullYear();
    return(
            <footer className="div-footer">          
                <section className="mi-github">
                    <h2>{year} &copy; Por: jova.dev </h2>
                    <span>
                        <a rel="noreferrer" href="https://github.com/jovadev" target="_blank" ><i className="fab fa-github" style={{fontSize:"50px"}}></i></a>
                    </span>
                </section>
            </footer>
    );
}
export default Footer;