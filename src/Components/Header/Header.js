import React from 'react'

class Header extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }
   
    render(){
        return(
            <div>
            <h1>The Gauntlet</h1>
            <button>START</button>
            </div>
        )
    }
}

export default Header;