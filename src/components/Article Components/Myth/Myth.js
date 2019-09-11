import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import InnerMyth from './InnerMyth'

export default class Myth extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/myth/:mythid' component={InnerMyth} />
            </div>
        )
    }
}
