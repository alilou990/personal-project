import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import InnerClimate from './InnerClimate'

export default class Climate extends Component {
    render() {
        return (
            <div>
                  <Route path='/world/:worldid/climate/:climateid' component={InnerClimate} />
            </div>
        )
    }
}
