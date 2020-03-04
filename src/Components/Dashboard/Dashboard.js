import React from 'react'
import Nav from '../Nav/Nav'
import TheGauntlet from '../TheGauntlet/TheGauntlet'

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
        }
    }
    
    
    
    render(){
        return(
            <div>
                <Nav/>
                <TheGauntlet/>
            </div>
        )
    }
}

export default Dashboard;