import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import Religion from './Religion'

export default class ReligionDash extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/religion/:religionid' component={Religion} />
            </div>
        )
    }
}
