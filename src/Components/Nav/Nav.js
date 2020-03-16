import React from 'react'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './Nav.css'

class Nav extends React.Component{


    logout = () => {
        Axios.post('/api/logout').then(() => {
            this.props.history.push('/')
        })
    }

    render(){
        return(
            <div>
            <h1 className={`${this.props.color}title`}>The Gauntlet</h1>
            <button onClick={this.logout} className={`${this.props.color}button`}>Logout</button>
            </div>
        )
    }
}
const mapStateToProps = reduxState =>{
    return{
        reduxState,
        color: reduxState.colorReducer.color

    }
}

export default connect(mapStateToProps)(withRouter(Nav))