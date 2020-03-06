import React from 'react'
import {withRouter} from 'react-router-dom'

class Profile extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <h1>Profile</h1>
            </div>
        )

    }
}

export default withRouter(Profile)