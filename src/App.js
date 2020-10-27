import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Game from './pages/Game.jsx';
import AnotherGame from './pages/AnotherGame.jsx';
import Nav from './layout/Nav.jsx';

const paths = [{
  name: 'Home',
  path: '/',
}, {
  name: 'Stars',
  path: '/stars',
},
{
  name: 'AnotherGame',
  path: '/game',
}];

function App() {
  return (
      <Router>
        <CssBaseline/>
        <Nav paths={paths}/>
        <Switch>
          <Route path='/stars'>
            <Game game="Stars"/>
          </Route>
          <Route path='/game'>
            <Game game="anotherGame"/>
          </Route>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
