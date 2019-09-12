import React, { Component } from 'react'
import {Route}from 'react-router-dom'

import Magic from './Magic'

export default class MagicDash extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/magic/:magicid' component={Magic} />
            </div>
        )
    }
}
