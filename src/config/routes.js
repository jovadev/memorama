import views from './views';

const routes={
     HOME:{
    component: views.Inicio,
    path:"/"
    },
    GAME:{
    component: views.Game,
    path:"/game"
    },
    SCORES:{
    component: views.Scores,
    path:"/scores"
    }
}
export default routes;