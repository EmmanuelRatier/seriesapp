import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-materialize'
import '../../../src/App.css';

class Contact extends Component{
    constructor(props){
        super(props)
        this.state= {
            contact: [],
            token : localStorage.getItem('token')
        }
    }

    callContact() {
        axios({
            method: 'get',
            url: 'https://api.betaseries.com/friends/list?token='+ this.state.token +'&key=acf46e44eed6',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            console.log(res.data.users)
            this.setState({
                contact : res.data.users,
                
            })
        })
    }

    handleDelContact = ev => {
        let id_user = ev.target.id
       axios({
           method: 'delete',
           url: 'https://api.betaseries.com/friends/friend?token=443cd9e5760c&key=acf46e44eed6&id='+ id_user,
           headers: {
               'Content-Type': 'application/json',
           }
       })
       .then( res => {
           if(res.status === 200) {
               alert('contact suprimé')
               this.componentDidMount()
           }
       })
       .catch((err) => {
          if(err.request.status === 400){
              alert('Erreur !')
          }
       })
   }
    
    componentDidMount(){
        this.callContact()
    }
    deconnexion(){
        localStorage.clear()
        window.location = "/"
    }

    render() {     
        if (this.state.token === null) {
            alert('veuillez au préalable vous insrcire sur le https://www.betaseries.com/')
            this.deconnexion()
        }else {
            return (
                <div className="row center my_modal">
                 {
                     this.state.contact.map((user, i) => {
                       return(
                           <div>
                                <ul> 
                                    <li >{user.login}</li>
                                    <div className="input-field">
                                        <Button onClick={this.handleDelContact} id={user.id} className="waves-red btn-flat" waves='light'>Suppr<i className="material-icons left">cloud</i></Button>
                                    </div>
                                </ul>
                           </div>
                       )
                     })
                 }
                </div>
              );
            }
        }
        
}

export default Contact
