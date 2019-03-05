import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-materialize'
import '../../../src/App.css';

class Auth extends Component{
    constructor(props){
        super(props)
        this.state= {
            login: '',
            password: '',
        }
    }

    handleSubmit = ev  => {
        let md5 = require('md5');
        ev.preventDefault()
        axios({
            method: 'post',
            url: 'https://api.betaseries.com/members/auth?key=acf46e44eed6',
            data: {
                login: this.state.login,
                password: md5(this.state.password)
            },
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            let token = res.data.token;
            if(res.status === 200) {
                localStorage.setItem('token', token)
                window.location = "/dashboard"
            }
        })
        .catch((err) => {
           if(err.request.status === 400){
               alert('Erreur !')
               localStorage.clear()
           }
        })
    }
    
    handleChange = (e)  => {
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    render() {     
        return (
          <div className="row center my_modal">
            <h4>Clicker pour se connecter</h4>
                <Modal
                    header='Conection sur Seriesapp'
                    fixedFooter
                    trigger={<Button floating large waves='light' icon='add'/>}>
                    <form onSubmit={this.handleSubmit} className="form-style">  
                        <div className="input-field">
                            <label htmlFor="login">Login</label>
                            <input 
                                type="text"
                                id="login"
                                onChange={this.handleChange}
                            />
                        </div>        
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                id="password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field center">
                            <Button className="btn" waves='light'>Se connecter<i class="material-icons left">cloud</i></Button>
                        </div>
                    </form>
                </Modal>
          </div>
        );
      }
}

export default Auth
