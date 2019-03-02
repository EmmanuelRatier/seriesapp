import React, { Component} from 'react'
import ListingSeries from './series/listingSeries';

class Dashboard extends Component { 
    render(){
        return (
          <div>
            <ListingSeries/>
          </div>
        )
    }
}

export default Dashboard
