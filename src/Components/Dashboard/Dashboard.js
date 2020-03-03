import React from 'react'
import Class from '../Class/Class'
import Nav from '../Nav/Nav'

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            classSelect:false,
        }
    }
    
    
    
    render(){
        return(
            <div>
                <Nav/>
                {this.state.classSelect === false ?(
                    <Class/>
                ):
                (
                    <div>Snark</div>
                )}
                
            </div>
        )
    }
}

export default Dashboard;