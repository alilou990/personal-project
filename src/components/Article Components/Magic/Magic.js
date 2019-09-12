import React, { Component } from 'react'
import {Route}from 'react-router-dom'

import InnerMagic from './InnerMagic'

export default class Magic extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/magic/:magicid' component={InnerMagic} />
            </div>
        )
    }
}