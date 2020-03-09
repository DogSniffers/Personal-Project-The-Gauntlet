import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getUser} from '../../ducks/reducer'


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
            <div>
                {this.state.loginview === true ? (
                    <>
                <h1>Login</h1>
                <input placeholder='Email' onChange={this.handleEmail}></input>
                <input placeholder='Password' onChange={this.handlePassword}></input>
                <button onClick={this.login}>Login</button>
                <p onClick={this.authView}>Don't have an account? Register here.</p>
                </>
                ):(
                <>
                <h1>Register</h1>
                <input placeholder='Email' onChange={this.handleEmail}></input>
                <input placeholder='Username' onChange={this.handleUsername}></input>
                <input placeholder='Password' onChange={this.handlePassword}></input>
                <input placeholder='Confirm Password' onChange={this.handleConfirmPassword}></input>
                <button onClick={this.register}>Create Account</button>
                <p onClick={this.authView}>Already have an account? Login here.</p>
                </>
            )}    
        </div>
    )
}}

export default connect(null,{getUser})(withRouter(Auth))