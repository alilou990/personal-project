import React, { Component } from 'react'

import Auth from './components/Auth/Auth'
import Nav from './components/Nav/Nav'

//stylesheets
import 'reset-css'

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Auth />
      </div>
    )
  }
}

