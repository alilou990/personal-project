import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import Military from './Military'

export default class MilitaryDash extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/military/:militaryid' component={Military} />
            </div>
        )
    }
}
