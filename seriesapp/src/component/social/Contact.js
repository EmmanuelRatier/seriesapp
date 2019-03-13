import React, { Component } from 'react'
import axios from 'axios'
import { Button, Table, Icon } from 'react-materialize'
import '../../../src/App.css';
import Navbar from '../layout/Navbar'
import SFooter from '../layout/SFooter'

class Contact extends Component{
    constructor(props){
        super(props)
        this.state= {
            contact: [],
            token : localStorage.getItem('token'),
            email:'',
            addUser: []
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
           url: 'https://api.betaseries.com/friends/friend?token='+this.state.token+'&key=acf46e44eed6&id='+ id_user,
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

   handleSubmit = ev  => {
    ev.preventDefault()
    axios({
        method: 'get',
        url: 'https://api.betaseries.com/friends/find?token='+this.state.token+'&key=acf46e44eed6&emails='+ this.state.email,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then( res => {
        if(res.status === 200) {
            this.setState({
                addUser:res.data.users
            })
        }
    })
    .catch((err) => {
       if(err.request.status === 400){
           alert('Erreur !')
       }
    })
}

handleAddContact = ev => {
    let id_user = ev.target.id    
    console.log(id_user)
    axios({
        method: 'post',
        url: 'https://api.betaseries.com/friends/friend?token='+this.state.token+'&key=acf46e44eed6&id='+ id_user,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then( res => {
        if(res.status === 200) {
            this.componentDidMount()
            window.Materialize.toast("Contact ajouté ", 1300)
        }
    })
    .catch((err) => {
       if(err.request.status === 400){
           alert('Erreur !')
       }
       console.log(err)
    })
}

    handleBlokContact = ev => {
        let id_user = ev.target.id    
        axios({
            method: 'post',
            url: 'https://api.betaseries.com/friends/block?token='+this.state.token+'&key=acf46e44eed6&id='+ id_user,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            if(res.status === 200) {
                this.componentDidMount()
                window.Materialize.toast("Contact Bloqué", 1300)
            }
        })
        .catch((err) => {
        if(err.request.status === 400){
            alert('Erreur !')
        }
        console.log(err)
        })
    }

   handleChange = (e)  => {
        this.setState({
            [e.target.id]:e.target.value
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
                <div>
                    <div>
                    <Navbar/>
                        <div>
                            <form onSubmit={this.handleSubmit} className="form-style">  
                                <div className="input-field">
                                    <label htmlFor="email">Ajouter un contact en tapant son email</label>
                                    <input 
                                        type="text"
                                        id="email"
                                        onChange={this.handleChange}
                                    />
                                </div>        
                                <div className="input-field center">
                                    <Button className="btn" waves='light'>Search<i class="material-icons left">cloud</i></Button>
                                </div>
                            </form>
                        </div>
                        <div>
                            {
                                this.state.addUser.map((addUser, i) => {
                                    return(
                                        <div>
                                            <p>{addUser.login}</p>
                                            <div className="input-field center">
                                                <Button onClick={this.handleAddContact} id={addUser.id} className="btn" waves='light'>Add<i class="material-icons left">cloud</i></Button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="center list_contact contact_layout">                       
                                 <div>
                                    <Table>
                                        <thead>
                                            <tr>
                                            <th data-field="id">Login</th>
                                            <th data-field="name">Bloque contact</th>
                                            <th data-field="price">Delete contact</th>
                                            </tr>
                                        </thead>
                                    {
                                        this.state.contact.map((user, i) => {
                                            return(

                                                    <tbody>
                                                        <tr>
                                                        <td>{user.login}</td>
                                                        <td>
                                                            <div>
                                                                <Button onClick={this.handleBlokContact} id={user.id} className="waves-red btn-flat" waves='light'>Bloquer<i className="material-icons left">cloud</i></Button>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <Button onClick={this.handleDelContact} id={user.id} className="waves-red btn-flat" waves='light'>Suppr<i className="material-icons left">cloud</i></Button>
                                                            </div>
                                                        </td>
                                                        </tr>
                                                        
                                                    </tbody>

                                                )
                                            })
                                    }
                                </Table>
                            </div>
                        </div>
                    </div>
                <div>
                    <SFooter/>
                </div>
                </div>
              );
            }
        }
        
    }

export default Contact
