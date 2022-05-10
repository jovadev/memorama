window.onload =main;
function main(){
    const btn_menu=document.querySelector('.btn_menu');
    if(btn_menu){
        btn_menu.addEventListener('click',()=>{
            const menu_items=document.querySelector('.menu_items');
            menu_items.classList.toggle('show');
            const btn_menu_show=document.querySelector(".btn_menu i"); 
            btn_menu_show.classList.toggle("fa-window-close");
            btn_menu_show.classList.toggle("fa-bars");
            //si la clase existe la elimina y devuelve false, sino la agrega y devuleve true 
            document.body.classList.toggle('stop-scrolling');
        });
    }
    const links=document.getElementById('menu_items');
    const enlaces=links.querySelectorAll('li');
    enlaces.forEach(enlace=>{        
        enlace.addEventListener('click',(e)=>{
            document.body.classList.remove('stop-scrolling');
            const menu_items=document.querySelector('.menu_items');
            let clases_menu=menu_items.classList;
            const btn_menu_show=document.querySelector(".btn_menu i");
            if(clases_menu.length>1){
                clases_menu.remove('show');
                if(btn_menu_show.className==="fas fa-bars"){
                    btn_menu_show.classList.toggle("fa-window-close");
                    btn_menu_show.classList.remove("fa-bars");
                }else{
                    btn_menu_show.classList.remove("fa-window-close");
                    btn_menu_show.classList.toggle("fa-bars");
                }
            }
        });
    });
}