import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ROUTING } from './constants';
import { Home, Camera } from './pages';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={`${ROUTING.HOME}`}>
          <Home />
        </Route>
        <Route path={`${ROUTING.CAMERA}`}>
          <Camera />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
