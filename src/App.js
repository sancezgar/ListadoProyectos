import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/TareaState';
import AlertaState from './context/alertas/AlertaState';
import AuthState from './context/autenticacion/AuthState';
import TokenAuth from  './config/TokenAuth';

import RutaPrivada from './components/rutas/RutaPrivada';

//Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token){
  TokenAuth(token);
}

function App() {
  return (
    <div>
      <ProyectoState>
        <TareaState>
          <AlertaState>
            <AuthState>
              <Router>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                  <RutaPrivada exact path="/proyectos" component={Proyectos} />
                </Switch>
              </Router>
            </AuthState>
          </AlertaState>
        </TareaState>
      </ProyectoState>
    </div>
  );
}

export default App;
