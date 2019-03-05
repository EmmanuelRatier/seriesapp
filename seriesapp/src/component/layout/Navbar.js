import React,{Component} from 'react'
import { Link} from 'react-router-dom'
import Discover from '../series/Discover'
import {SideNav, Button, SideNavItem} from 'react-materialize'
class Navbar extends Component  {
    constructor(props){
        super(props)
        this.state = {

        }
      }

      //function deconnexion btn logout
      deconnexion(){
          localStorage.clear()
          window.location = "/"
      }
      
    render() {
        return (
          <div>
              <SideNav
                trigger={<Button icon="menu" className="style_btn"></Button>}
                options={{ closeOnClick: true }}
                >
                <div className="sidebar-top">
                <SideNavItem header>Series app</SideNavItem>
                <SideNavItem><Link to={{ pathname: "/discover" }} component={ Discover}>Découvrires des séries</Link></SideNavItem>
                <SideNavItem><Link to={{ pathname: "/dashboard" }} >Mes series</Link></SideNavItem>
                </div>
                <SideNavItem divider />
                <SideNavItem subheader>Subheader</SideNavItem>
                <SideNavItem waves href='#!third'><button className="btn deco" onClick={() => this.deconnexion()}>Logout</button></SideNavItem>
              </SideNav>
              {/* <div class="navbar-fixed">
                  <nav>
                      <div class="nav-wrapper">
                            
                          <ul class="right hide-on-med-and-down">
                           <li>
                                
                           </li>
                           <li>
                               
                           </li>
                          </ul>
                      </div>
                  </nav>
              </div> */}
          </div>
        )
    }
}

export default Navbar
