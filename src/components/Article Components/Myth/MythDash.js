import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import Myth from './Myth'

export default class MythDash extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/myth/:mythid' component={Myth} />
            </div>
        )
    }
}
