import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './partials/Header';
import Footer from './partials/Footer';
import PageNotFound from './routes/PageNotFound';
import routes from './config/routes';
import {useEffect} from 'react';
//import Home from './components/Home';
function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "../menu.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);
  
  let rutas=Object.values(routes).map((route,i)=>{
    return <Route 
      exact
      key={route.path}
      path={route.path}
      component={route.component}
    />
  });
  return (
      <div className="contenedor_app" id="contenedor_app">
        <Router>
          <Header />
          <Switch>
            {rutas}
            <Route component={PageNotFound}/>
          </Switch>
        </Router>
        <Footer />    
      </div>
  );
}

export default App;
