import React, { Component } from 'react';
import User from './component/user/User';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={User}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
