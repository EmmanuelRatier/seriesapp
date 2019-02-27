import React, { Component } from 'react'
import axios from 'axios'

class User extends Component{
    constructor(props){
        super(props)
        this.state= {
            login: '',
            password: '',
        }
    }

    handleConnection = ev  => {
        ev.preventDefault()
        axios({
            method: 'post',
            url: 'https://api.betaseries.com/members/auth?key=acf46e44eed6',
            data: {
              login: this.state.login,
              password: this.state.password
            },
            headers: {
                'Content-Type': 'application/json',
            }
          })
        .then( res => {
            console.log(res)
        })
    }

    handleChange(value, param) {
        this.setState({
            [param]:value
        })
    }

    render() {  
        return (
          <div>
              <form>
                  <input 
                    type="text"
                    name="login"
                    value={this.state.pseudo}
                    onChange={(e) => this.handleChange(e.target.value, 'login')}
                   />
                   <input 
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={(e) => this.handleChange(e.target.value, 'password')}
                   />
                <input type="button" value="Connection" onClick={this.handleConnection.bind(this)}/>
              </form>
          </div>
        );
      }
}

export default User
