import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import Profession from './Profession'

export default class ProfessionDash extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/profession/:professionid' component={Profession} />
            </div>
        )
    }
}
