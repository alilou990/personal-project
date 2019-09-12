import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import Climate from './Climate'

export default class ClimateDash extends Component {
    render() {
        return (
            <div>
                <h1>Hello</h1>
                  <Route path='/world/:worldid/climate/:climateid' component={Climate} />
            </div>
        )
    }
}