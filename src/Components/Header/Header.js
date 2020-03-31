import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import TitleChange from '../TitleChange/TitleChange'
import {connect} from 'react-redux'
import {setColor} from '../../ducks/colorReducer'
import './Header.css'
import GauntletTitle from '../GauntletTitle/GauntletTitle'

class Header extends React.Component{
    constructor(){
        super()
        this.state = {
            titleChange:false,
            colorChange:false
        }
    }
   logout = () => {
    axios.post('/api/logout').then(res =>{
        this.props.history.push('/')
    })

   };
  

  
  
  
    render(){
        console.log(this.props)
        return(
            <div>
            <h1 className={`${this.props.color}Header`}>The Gauntlet</h1>
            <GauntletTitle/>
            <div>
                <button onClick={ () =>this.props.history.push('/dashboard')} className={`${this.props.color}Button`}>START</button>
                <button onClick={() => this.props.history.push('/leaderboard')} className={`${this.props.color}Button`}>LEADERBOARD</button>
                <button onClick={() => this.props.history.push('/profile')} className={`${this.props.color}Button`}>PROFILE</button>
                <button onClick={this.logout} className={`${this.props.color}Button`}>LOGOUT</button>
            </div>
            <button onClick={() => this.setState({colorChange:!this.state.colorChange})} className={`${this.props.color}Button`}>Color Options</button>
            {this.state.colorChange === true?(
                <div>
                    <button onClick={() => this.props.setColor({color:'green'})} className={`${this.props.color}Button`}>Green</button>
                    <button onClick={() => this.props.setColor({color:'red'})} className={`${this.props.color}Button`}>Red</button>
                    <button onClick={() => this.props.setColor({color:'blue'})} className={`${this.props.color}Button`}>Blue</button>
                    <button onClick={() => this.props.setColor({color:'yellow'})} className={`${this.props.color}Button`}>Yellow</button>
                </div>
            ):(
                null
            )}
            <button onClick={() => this.setState({titleChange:!this.state.titleChange})} className={`${this.props.color}Button`}>Title Change Options</button>
            {this.state.titleChange === true? (
                <TitleChange color={this.props.color}/>
            ):(
                null
            )}
            </div>
        )
    }
}
const mapStateToProps = (reduxState) => {
    return (
        {color: reduxState.colorReducer.color}
    )

}

export default connect(mapStateToProps,{setColor})(withRouter(Header));