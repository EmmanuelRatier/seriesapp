import React, { Component } from 'react';
import Auth from './component/auth/Auth';
import Dashboard from './component/Dashboard';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  render() {
       return (
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Auth}/>
              <Route exact path="/dashboard" component={Dashboard} />           
            </Switch>
          </div>
        </BrowserRouter>
      );
  }
}

export default App;
