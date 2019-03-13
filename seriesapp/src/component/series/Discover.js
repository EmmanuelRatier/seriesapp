import React, { Component } from 'react'
import axios from 'axios';
import { Card, CardTitle } from 'react-materialize'
import { Button, Modal } from 'react-materialize'
import Navbar from '../layout/Navbar'


class ListingSeries extends Component {
    constructor(props){
        super(props)
        this.state = {
            discover_series:[],
        }
    }
    
    callSeries() {
        axios({
            method: 'get',
            url: 'https://api.betaseries.com/shows/discover?key=acf46e44eed6',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            //console.log(res.data.shows)
            this.setState({
                discover_series : res.data.shows
            })
        })
    }
    
    componentDidMount(){
        this.callSeries()
    }
    
    deconnexion(){
        localStorage.clear()
        window.location = "/"
    }
    
    handleAddSerie = ev  => {
         ev.preventDefault()
         console.log(ev.target.id)
         let id_serie = ev.target.id

        axios({
            method: 'post',
            url: 'https://api.betaseries.com/shows/show?token=443cd9e5760c&key=acf46e44eed6&id='+ id_serie,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            if(res.status === 200) {
                alert('serie ajouté')
            }
        })
        .catch((err) => {
           if(err.request.status === 400){
               alert('Cette série est déja ajouté')
           }
        })
    }


    render(){
        let token = localStorage.getItem('token')
        if (token === null) {
            alert('veuillez au préalable vous insrcire sur le https://www.betaseries.com/')
            this.deconnexion()
          }else {
              return (
                  <div className="dashboard">
                  <Navbar/>
                  <div className="row">
                      <div className="content-card"> 
                          {
                              this.state.discover_series.map((discover_series, i) => {
                                return (
                                    <div>
                                          <div className="style_card">
                                               <Card className='small'
                                                  key={i}
                                                  header={<CardTitle image={discover_series.images.banner}/>}
                                                  actions={[
                                                    <Modal
                                                        header={discover_series.title}
                                                        fixedFooter
                                                        trigger={<Button className="teal darken-1" floating small waves='light' icon='add'/>}>
                                                        <img alt={discover_series.title} src={discover_series.images.banner}/>
                                                        <p>{discover_series.genres} </p>
                                                        <p>{discover_series.description}</p>
                                                        <p>{discover_series.seasons} saisons</p>
                                                        <p>Nombre d'épisode:{discover_series.episodes}</p>
                                                        <p>Durée d'un épisode {discover_series.length} min</p>
                                                            <div className="input-field center">
                                                                <Button onClick={this.handleAddSerie} id={discover_series.id} className="waves-teal btn-flat" waves='light'>Ajouter a vos séries<i className="material-icons left">cloud</i></Button>
                                                            </div>
                                                    
                                                    </Modal>]}>
                                                  {discover_series.title}                                               
                                              </Card>
                                          </div>
                                          {/* <Thefooter/> */}
                                      </div>
                                  )
                              })
                          }
                         
                      </div>
                  </div>
                </div>
              )
            }
        }
    }

export default ListingSeries