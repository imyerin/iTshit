import React from 'react';
import {
    BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
function App() {
  return (
  <Router><div>{}<Switch>
      <Route exact path="/"component = {Auth(LandingPage,null)}/>
      <Route exact path="/login"component = {Auth(LoginPage,false)}/>
      <Route exact path="/register"component = {Auth(RegisterPage,false)}/>
      </Switch>
     </div>
      </Router>
  );
}

export default App;
// null - 아무나 출입가능
// true - 로그인한 유저만 
// false - 로그인 안한 유저만