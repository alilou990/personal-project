import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import InnerReligion from './InnerReligion'

export default class Religion extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/religion/:religionid' component={InnerReligion} />
            </div>
        )
    }
}
