import React from 'react';
import axios from 'axios';


class Auth extends React.Component{
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
            confirmPassword:'',
            username:'',
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

    login(){
        const {email,password} = this.state
        axios.post('/api/login', {email,password}).then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/dashboard')
            console.log(res.data)
        }).catch(err => console.log(err))
    };

    register(){
        const {email,password,confirmPassword} = this.state

    };

    render(){
        return(
            <div>
                <h1>Login</h1>
                <input placeholder='Email' onChange={this.handleEmail}></input>
                <input placeholder='Password' onChange={this.handlePassword}></input>
                <button>Login</button>
            </div>
        )
    }
}

export default Auth