import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import TitleChange from '../TitleChange/TitleChange'

class Header extends React.Component{
    constructor(){
        super()
        this.state = {
            titleChange:false
        }
    }
   logout = () => {
    axios.post('/api/logout').then(res =>{
        this.props.history.push('/')
    })

   }
    render(){
        return(
            <div>
            <h1 className='pageTitle'>The Gauntlet</h1>
            <div>
                <button onClick={ () =>this.props.history.push('/dashboard')}>START</button>
                <button onClick={() => this.props.history.push('/leaderboard')}>LEADERBOARD</button>
                <button onClick={() => this.props.history.push('/profile')}>PROFILE</button>
                <button onClick={this.logout}>LOGOUT</button>
            </div>
            <button onClick={() => this.setState({titleChange:!this.state.titleChange})}>Title Change Options</button>
            {this.state.titleChange === true? (
                <TitleChange/>
            ):(
                null
            )}
            </div>
        )
    }
}

export default withRouter(Header);