import React, { Component } from 'react';
import Auth from './component/auth/Auth';
import Dashboard from './component/Dashboard';
import Discover from './component/series/Discover'
import Contact from './component/social/Contact'
import DarkModeToggle from './component/color/DarkModeToggle';

import './App.css';
import './styles.scss';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
       return (
        <BrowserRouter>
          <div className="App">
            <h2>Series app</h2>
            <DarkModeToggle />
            <Switch>
              <Route exact path="/" component={Auth}/>
              <Route exact path="/dashboard" component={Dashboard} />    
              <Route exact path="/discover" component={ Discover }/>    
              <Route exact path="/contact" component={ Contact }/>    
            </Switch>
          </div>
        </BrowserRouter>
      );
  }
}

export default App;
