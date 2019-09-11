import React, { Component } from 'react'
import routes from './routes'
import Nav from './components/Nav/Nav'

//stylesheets
import 'reset-css'

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        {routes}
      </div>
    )
  }
}

