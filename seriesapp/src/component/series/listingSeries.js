import React, { Component } from 'react'
import axios from 'axios';
import { Card, CardTitle } from 'react-materialize'
import { Button, Modal } from 'react-materialize'
import Navbar from '../layout/Navbar'
import SFooter from '../layout/SFooter'

class ListingSeries extends Component {
    constructor(props){
        super(props)
        this.state = {
            series:[],
            archive:[]
        }
    }
    
    callSeries() {
        //console.log(localStorage.getItem('token'))
        let token = localStorage.getItem('token')
        axios({
            method: 'get',
            url: 'https://api.betaseries.com/shows/member?token='+ token +'&key=acf46e44eed6',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            //console.log(res.data.shows)
            this.setState({
                series : res.data.shows
            })
        })
    }

    handleDelSerie = ev => {
         console.log(ev.target.id)
         let id_serie = ev.target.id

        axios({
            method: 'delete',
            url: 'https://api.betaseries.com/shows/show?token=443cd9e5760c&key=acf46e44eed6&id='+ id_serie,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            if(res.status === 200) {
                alert('serie suprimé')
                this.componentDidMount()
            }
        })
        .catch((err) => {
           if(err.request.status === 400){
               alert('Erreur !')
           }
        })
    }

    handleArchiveSerie = ev => {
        let id_serie = ev.target.id    
        axios({
            method: 'post',
            url: 'https://api.betaseries.com/shows/archive?token=443cd9e5760c&key=acf46e44eed6&id='+ id_serie,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            this.setState({
                archive : res.data.show
            })
            console.log(res)
            if(res.status === 200) {
                alert('serie archivés')
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
        this.callSeries()
    }
    
    deconnexion(){
        localStorage.clear()
        window.location = "/"
    }
    
    render(){
        if (localStorage.getItem("token") === null) {
            alert('veuillez au préalable vous insrcire sur le https://www.betaseries.com/')
            this.deconnexion()
        }else {
            return (
                  <div className="dashboard">
                  <Navbar/>
                  <div className="row">
                      <div className="content-card">
                          {
                              this.state.series.map((serie, i) => {
                                  return (
                                      <div>
                                          <div className="cartas">
                                              <Card className='small'
                                                  key={i}
                                                  header={<CardTitle image={serie.images.banner}/>}
                                                  actions={[
                                                    <Modal
                                                    header={serie.title}
                                                        fixedFooter
                                                        trigger={<Button className="btn-flat waves-effect teal lighten-3" floating small waves='teal' icon='add'/>}>
                                                        <img alt={serie.title} src={serie.images.banner}/>
                                                        <p>{serie.genres} </p>
                                                        <p>{serie.description}</p>
                                                        <p>{serie.seasons} saisons</p>
                                                        <p>Nombre d'épisode:{serie.episodes}</p>
                                                        <p>Durée d'un épisode {serie.length} min</p>

                                                        <div className="input-field right">
                                                            <Button onClick={this.handleDelSerie} id={serie.id} className="waves-red btn-flat" waves='light'>Suppr<i className="material-icons left">cloud</i></Button>
                                                        </div>
                                                        <div className="input-field right">
                                                            <Button onClick={this.handleArchiveSerie} id={serie.id} className="waves-teal darken-3 btn-flat" waves='light'>Archivés<i className="material-icons left">archive</i></Button>
                                                        </div>
                                                    </Modal>]}>
                                                  {serie.title}                                               
                                              </Card>
                                          </div>
                                      </div>
                                  )
                                })
                            } 
                      </div>
                  </div>
                <hr/>
                <h4>putin c le zga</h4>
                 {/* en GET la requete  */}
                 {/* en GET la requete  */}
                 {/* en GET la requete  */}
                 {/* en GET la requete pour affihcer les series archivées */}
                {
                    this.state.archive.map((arch, i) => {
                        return(
                            <div key={i}>
                                {arch.title} 
                            </div>
                        )
                    })
                }
                  <SFooter/>
                </div>
              )
            }
        }
    }

export default ListingSeries