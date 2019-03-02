import React, { Component } from 'react'
import axios from 'axios';
import { Card, CardTitle } from 'react-materialize'

class ListingSeries extends Component {
    constructor(props){
        super(props)
        this.state = {
            series:[],
        }
    }
    
    callSeries() {
        console.log(localStorage.getItem('token'))
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
                  <div className="row">
                      <button className="btn deco" onClick={() => this.deconnexion()}>Logout</button>
                      <div className="content-card">
                          {
                              this.state.series.map((serie, i) => {
                                  return (
                                      <div>
                                          <div className="cartas">
                                              <Card className='small'
                                                  key={i}
                                                  header={<CardTitle image={serie.images.banner}/>}
                                                  actions={[<p>This is a Link</p>]}>
                                                  {serie.title}
                                              </Card>
                                          </div>
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