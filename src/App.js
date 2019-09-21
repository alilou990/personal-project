import React, { Component } from 'react'
import routes from './routes'
// import {Route, Switch} from 'react-router-dom'


import Nav from './components/Nav/Nav'


//stylesheets
import styled from 'styled-components'
import 'reset-css'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className='main-container'>
        <Nav />
        {routes}         
      </div>
    )
  }
}



