import React,{ Component} from 'react'
import {Footer} from 'react-materialize'
import {Link} from 'react-router-dom'
import '../../../src/App.css';

class SFooter extends Component  {
    constructor(props){
        super(props)
        this.state = {

        }
      }

   
    render() {
        return (
          <div>
            <Footer copyrights="2019" 
                moreLinks={
                    <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                }
                links={
                    <ul>
                        <li>
                            <Link className="grey-text text-lighten-4" to={{ pathname: "/discover" }}>Découvrires des séries</Link>
                        </li>
                        <li>
                            <Link className="grey-text text-lighten-4" to={{ pathname: "/dashboard" }}>Mes series</Link>
                        </li>
                    </ul>
                }
                className=' teal darken-3'
                >
                    <h5 className="white-text">Series app web</h5>
                    <p className="grey-text text-lighten-4">.</p>
                </Footer>
                        </div>
                        )
                    }
            }

export default SFooter
