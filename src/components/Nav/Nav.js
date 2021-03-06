import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
// import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios';

import './Nav.css'



class Nav extends Component {
    logout = () => {
        axios.post('/auth/logout')
            .then(() => {
                console.log('user is logged out')
                this.props.history.push('/')
            })
    }

    render() {
        const {location} = this.props
        return (
            <div>
             {location.pathname === '/' 
            ?
            null
            :
            <div className='navbar'>
                <div className='logo-container'>Fabula Terra</div>
                    <div className='info-container'>
                        <div className='user-info'>
                            <h1>Welcome Back, </h1>
                            <h1>{this.props.username}</h1>
                        </div>
                        <div className='logout-container'>
                            <button className='logout-btn' onClick={this.logout}>Logout</button>
                        </div>
                    </div>
            </div>
            }  
               
            </div>
        )
    }
}
const mapStateToProps = (reduxState) => {
    return {
        username: reduxState.username
    }
}

export default withRouter(connect(mapStateToProps)(Nav))

//Styled Component
// const Button = styled.button`
// background: palevioletred;
// border-radius: 3%;
// border: 2px solid palevioletred;
// color: white;
// margin: em 1em;
// padding: 0.25em 1em;
// `



