import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import InnerMilitary from './InnerMilitary'

export default class Military extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/military/:militaryid' component={InnerMilitary} />
            </div>
        )
    }
}