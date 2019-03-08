import React, { Component } from 'react'
import axios from 'axios';
import { Button, Modal, Card, CardTitle, Collapsible, CollapsibleItem } from 'react-materialize'
import Navbar from '../layout/Navbar'
import SFooter from '../layout/SFooter'

class ListingSeries extends Component {
    constructor(props){
        super(props)
        this.state = {
            series:[],
            archives:[],
            seasons : [],
            episodes:[],
            token : localStorage.getItem('token'),
        }
    }
    
    callSeries() {
        axios({
            method: 'get',
            url: 'https://api.betaseries.com/shows/member?token='+ this.state.token +'&key=acf46e44eed6',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            this.setState({
                series : res.data.shows,
            })
        })
    }

    handleDelSerie = ev => {
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
            url: 'https://api.betaseries.com/shows/archive?token='+this.state.token+'&key=acf46e44eed6&id='+ id_serie,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
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

    callSeriesArch() {
        axios({
            method: 'get',
            url: 'https://api.betaseries.com/shows/member?token='+ this.state.token +'&key=acf46e44eed6&status=archived',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            this.setState({
                archives: res.data.shows
            })
        })
    }
    delSerieArch = ev => {
        let id_serie = ev.target.id 
        axios({
            method: 'delete',
            url: 'https://api.betaseries.com/shows/archive?token='+this.state.token+'&key=acf46e44eed6&id='+ id_serie,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            if(res.status === 200) {
                alert("la serie n'est plus archivé")
                this.componentDidMount()
            }
        })
        .catch((err) => {
           if(err.request.status === 400){
               alert('Erreur !')
            }
        })
    }
    
    get_seasons = ev => {
        ev.preventDefault()
        let id_serie = ev.target.id
        axios({
            method: 'get',
            url: 'https://api.betaseries.com/shows/seasons?token=443cd9e5760c&key=acf46e44eed6&id='+id_serie,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            this.setState({
                seasons : res.data.seasons
            })
        })
        .catch((err) => {
           if(err.request.status === 400){
               alert('Erreur !')
           }
        })
    }

    callEpisodes = ev => {
        ev.preventDefault()
        let id_serie = ev.target.id
        let id_seasons = ev.target.className
        axios({
            method: 'get',
            url: 'https://api.betaseries.com/shows/episodes?token='+ this.state.token +'&key=acf46e44eed6&season='+id_seasons +'&id='+ id_serie,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( res => {
            console.log(res.data.episodes)
            this.setState({
                episodes: res.data.episodes
            })
        })
        .catch((err) => {
            alert(err)
        })
    }
    componentDidMount(){
        this.callSeries()
        this.callSeriesArch()
    }
    
    deconnexion(){
        localStorage.clear()
        window.location = "/"
    }
    
    render(){
        if (this.state.token === null) {
            alert('veuillez au préalable vous insrcire sur le https://www.betaseries.com/')
            this.deconnexion()
        }else {
            return (
                  <div className="dashboard">
                  <Navbar/>
                  <div className="row">
                  <h3>Mes séries</h3>
                      <div className="content-card">
                          {
                              this.state.series.map((serie, i) => {
                                  let status = serie.user.archived
                                  if (status === false ){
                                      return (
                                          <div>
                                              <div className="cartas">
                                                  <Card className='small'
                                                      key={i}
                                                      header={<CardTitle title={serie.title} image={serie.images.banner}/>}
                                                      actions={[
                                                        <Modal
                                                            header={serie.title}
                                                            fixedFooter
                                                            trigger={<Button className="btn-flat waves-effect teal lighten-3" floating small waves='teal' icon='add'/>}>
                                                            <div>
                                                                <img alt={serie.title} src={serie.images.banner}/>
                                                                <p>{serie.genres} </p>
                                                                <p>{serie.description}</p>
                                                                <p>{serie.seasons} saisons</p>
                                                                <p>Nombre d'épisode:{serie.episodes}</p>
                                                                <p>Durée d'un épisode {serie.length} min</p>
                                                                <p>Note {serie.notes.mean}</p>    
                                                                <div className="input-field right">
                                                                    <Button onClick={this.handleDelSerie} id={serie.id} className="waves-red btn-flat" waves='light'>Suppr<i className="material-icons left">cloud</i></Button>
                                                                </div>
                                                                <div className="input-field right">
                                                                    <Button onClick={this.handleArchiveSerie} id={serie.id} className="waves-teal darken-3 btn-flat" waves='light'>Archivés<i className="material-icons left">archive</i></Button>
                                                                </div>
                                                                <div className="input-field right space">
                                                                    <Button onClick={this.get_seasons} className="waves-teal darken-3 btn-flat" id={serie.id}>Afficher les épisodes</Button>
                                                                </div>    
                                                                <div className="collaps">
                                                                    {
                                                                        this.state.seasons.map((nbr_seasons, i) => {
                                                                            return(
                                                                                    <Collapsible>
                                                                                        <CollapsibleItem header={'Saison ' + nbr_seasons.number} icon='filter_drama'>
                                                                                        <div onClick={this.callEpisodes} id={serie.id} className={nbr_seasons.number}>Voir les épisodes de la saison</div>
                                                                                    {
                                                                                        this.state.episodes.map((list_episodes, i) => {
                                                                                            return(
                                                                                                <div>
                                                                                                   
                                                                                                    
                                                                                                        <div>
                                                                                                            <p>{list_episodes.title}</p>
                                                                                                        </div>
                                                                                                        <div>
                                                                                                            <p>
                                                                                                                {list_episodes.description}     
                                                                                                            </p>
                                                                                                        </div>
                                                                                                  

                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                        </CollapsibleItem>
                                                                                    </Collapsible>
                                                                                    
                                                                                    )
                                                                                })
                                                                            }
                                                                </div>
                                                              
                                                            </div>
                                                            
                                                            <div className="input-field left">
                                                            </div>
                                                        </Modal>]}>
                                                      {serie.title}                                               
                                                  </Card>
                                              </div>
                                          </div>
                                      )
                                  }
                                })
                            } 
                      </div>
                  </div>
                <hr/>
                <h3>Series archivées</h3>
                    <div className="content-card">
                    {
                                this.state.archives.map((serie_arch, i) => {
                                    return(
                                        <div>
                                            <div className="cartas">
                                              <Card className='small'
                                                  key={i}
                                                  header={<CardTitle image={serie_arch.images.banner}/>}
                                                  actions={[
                                                    <Modal
                                                    header={serie_arch.title}
                                                        fixedFooter
                                                        trigger={<Button className="btn-flat waves-effect teal lighten-3" floating small waves='teal' icon='add'/>}>
                                                        <img alt={serie_arch.title} src={serie_arch.images.banner}/>
                                                        <p>{serie_arch.genres} </p>
                                                        <p>{serie_arch.description}</p>
                                                        <p>{serie_arch.seasons} saisons</p>
                                                        <p>Nombre d'épisode:{serie_arch.episodes}</p>
                                                        <p>Durée d'un épisode {serie_arch.length} min</p>
                                                        <div className="input-field right">
                                                            <Button onClick={this.delSerieArch} id={serie_arch.id} className="waves-red btn-flat" waves='light'>Ne plus archivé<i className="material-icons left">cloud</i></Button>
                                                        </div>                                                       
                                                    </Modal>
                                                ]}>
                                                  {serie_arch.title}
                                              </Card>
                                          </div>
                                        </div>
                                    )
                                })
                            }
                    </div>
                  <SFooter/>
                </div>
              )
            }
        }
    }

export default ListingSeries