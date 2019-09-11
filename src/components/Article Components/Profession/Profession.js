import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import InnerProfession from './InnerProfession'

export default class Profession extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/profession/:professionid' component={InnerProfession} />
            </div>
        )
    }
}
