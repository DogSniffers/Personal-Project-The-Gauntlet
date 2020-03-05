import React from 'react'
import Nav from '../Nav/Nav'
import ClassSelect from '../ClassSelect/ClassSelect'

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
                <ClassSelect/>
            </div>
        )
    }
}

export default Dashboard;