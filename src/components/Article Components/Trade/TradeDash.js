import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import Trade from './Trade'

export default class Trade extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/trade/:tradeid' component={Trade} />
            </div>
        )
    }
}
