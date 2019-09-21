import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {userInfo} from '../../redux/reducer'

//stylesheets
import './Auth.css'

class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            register: false
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleToggle = () => {
        this.setState({
            register: !this.state.register
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
                this.props.userInfo(res.data)
                this.props.history.push('/dashboard')
                this.setState({
                    username: '',
                    password: ''
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    login = () => {
        const {username, password} = this.state
        const body = {
            username,
            password
        }
        axios.post('/auth/login', body)
            .then(res => {
                console.log(res.data)
                this.props.userInfo(res.data)
                this.props.history.push('/dashboard')
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
            <div className='auth-container'>
                {!this.state.register
                ?
                (<div className='login-container'>
                    <div className='subtitle-container'>
                        <h1 className='site-name'>Fabula Terra</h1>
                        <div className='subtitle-text'>
                        <h1>Your World</h1>
                        <h1>At Your Fingertips</h1>
                        </div>
                    </div>
                    <div className='inputs'>
                        <div className='auth-header'>
                            <h1>Sign In</h1>
                        </div>
                        <div className='title username'>
                            <label className='input-title'>Username:</label>
                            <input 
                                className='input'
                                type='text'
                                name='username'
                                onChange={this.handleChange}
                                value={this.state.username} />
                        </div>
                        <div className='title username'>
                            <label className='input-title'>Password:</label>
                            <input 
                                className='input'
                                type='password'
                                name='password'
                                onChange={this.handleChange}
                                value={this.state.password} />
                        </div>
                        <div className='button auth'>
                        <button className='auth-btns' onClick={this.handleToggle}>Register</button>
                            <button className='auth-btns' onClick={this.login}>Sign In</button>
                        </div>
                    </div>
                </div>)
                :
                (<div className='login-container'>
                    <div className='subtitle-container'>
                    <h1 className='site-name'>Fabula Terra</h1>
                    <div className='subtitle-text'>
                        <h1>Your World</h1>
                        <h1>At Your Fingertips</h1>
                    </div>
                    </div>
                    <div className='inputs'>
                        <div className='auth-header'>
                            <h1>Register</h1>
                        </div>
                        <div className='title username'>
                            <label className='input-title'>Username:</label>
                            <input 
                                className='input'
                                type='text'
                                name='username'
                                onChange={this.handleChange}
                                value={this.state.username} />
                        </div>
                        <div className='title username'>
                            <label className='input-title'>Password:</label>
                            <input 
                                className='input'
                                type='password'
                                name='password'
                                onChange={this.handleChange}
                                value={this.state.password} />
                        </div>
                        <div>
                            <button className='auth-btns' onClick={this.register}>Register</button>
                            <button className='auth-btns' onClick={this.handleToggle}>Sign In</button>
                        </div>
                    </div>
                </div>)
                }
            </div>
        )
    }
}

export default connect(null, {userInfo})(Auth)
