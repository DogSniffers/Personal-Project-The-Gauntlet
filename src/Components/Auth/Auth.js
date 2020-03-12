import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getUser} from '../../ducks/reducer'
import './Auth.css'



class Auth extends React.Component{
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
            confirmPassword:'',
            username:'',
            loginview:true
        }
    }

    handleEmail = e =>{
        this.setState({email:e.target.value})
    };

    handlePassword = e => {
        this.setState({password:e.target.value})
    };

    handleConfirmPassword = e => {
        this.setState({confirmPassword:e.target.value})
    };

    handleUsername = e => {
        this.setState({username:e.target.value})
    };

    authView = () => {
        this.setState({loginview:!this.state.loginview})
    }

    login = () => {
        let {email,password} = this.state
        if(email === ''){
            alert('Email is required!')
        }else{
            if(password === ''){
                alert('Password is required!')
            }else{
        axios.post('/api/login', {email,password}).then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/header')
        }).catch(err => console.log(err))
    }}};

    register= () =>{
        let {email,password,confirmPassword,username} = this.state
        if(email === ''){
            alert('A valid Email is required!')
        }else{
            if(username === ''){
                alert('Username is required!')
        }else{
            if(password === ''){
                alert('A password is required!')
        }else{
            if(password !==confirmPassword){
                alert('Passwords do not match!')
        }else{
            axios.post('/api/register', {email,password,username}).then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/header')
            }).catch(err => console.log(err))
        }
    }}}};

    render(){
        return(
            <div className='bigboidiv'>
                {this.state.loginview === true ? (
                <div className='authHolders'>
                <h1 className='pageTitle'>Login</h1>
                <div>
                    <input placeholder='Email' onChange={this.handleEmail} className='authInputs'></input>
                    <input placeholder='Password' onChange={this.handlePassword} className='authInputs'></input>
                </div>
                <button onClick={this.login} className='buttons'>Login</button>
                <p onClick={this.authView}>Don't have an account? Register here.</p>
                </div>
                ):(
                <div className='authHolders'>
                <h1 className='pageTitle'>Register</h1>
                <div>
                    <input placeholder='Email' onChange={this.handleEmail} className='authInputs'></input>
                    <input placeholder='Username' onChange={this.handleUsername} className='authInputs'></input>
                </div>
                <div>
                    <input placeholder='Password' onChange={this.handlePassword} className='authInputs'></input>
                    <input placeholder='Confirm Password' onChange={this.handleConfirmPassword}className='authInputs'></input>
                </div>
                <button onClick={this.register} className='buttons'>Create Account</button>
                <p onClick={this.authView}>Already have an account? Login here.</p>
                </div>
            )}    
        </div>
    )
}}

export default connect(null,{getUser})(withRouter(Auth))