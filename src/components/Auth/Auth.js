import React, { Component } from 'react'
import axios from 'axios'

//stylesheets
import './Auth.css'

export default class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            profile_pic: '',
            register: false,
            login: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    register = () => {
        //body info
        const {username, password} = this.state
        const body = {
            username,
            password
        }
        //send post axios request
        axios.post('/auth/register', body)
            .then(res => {
                //this.props.userInfo(res.data)
                //this.props.history.push('/dashboard')
                this.setState({
                    username: '',
                    password: '',
                    profile_pic: ''
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    login = (req, res) => {
        const {username, password} = this.state
        const body = {
            username,
            password
        }
        axios.post('/auth/login', body)
            .then(res => {
                //this.props.UserInfo(res.data)
                //this.props.history.push('/dashboard')
                this.setState({
                    username: '',
                    password: '',
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        return (
            <div className='main-container'>
                <div className='subtitle'>
                    <h1>Create A World All Your Own</h1>
                </div>
                <div className='inputs'>
                    <label>Username:</label>
                    <input 
                        type='text'
                        name='username'
                        onChange={this.handleChange}
                        value={this.state.username} />
                    <label>Password:</label>
                    <input 
                        type='password'
                        name='password'
                        onChange={this.handleChange}
                        value={this.state.password} />
                    <label>Profile Picture:</label>
                    <input 
                        type='text'
                        name='profile_picture'
                        onChange={this.handleChange}
                        value={this.state.profile_pic} />
                    <button onClick={this.login}>Login</button>
                    <button onClick={this.register}>Sign Up</button>
                </div>

            </div>
        )
    }
}
