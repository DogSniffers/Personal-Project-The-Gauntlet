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

    login(){
        const {email,password} = this.state
        axios.post('/api/login', {email,password}).then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/dashboard')
            console.log(res.data)
        }).catch(err => console.log(err))
    };

    register(){
        const {email,password,confirmPassword,username} = this.state
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
                this.props.history.push('/dashboard')
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
                <button>Login</button>
                </>
                ):(
                <>
                <h1>Register</h1>
                <input placeholder='Email' onChange={this.handleEmail}></input>
                <input placeholder='Username'></input>
                <input placeholder='Password' onChange={this.handlePassword}></input>
                <input placeholder='Confirm Password'></input>
                <button>Register</button>
                </>
                )}
                
            </div>
        )
    }
}

export default Auth