import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Government from './Government';

export default class GovernmentDash extends Component {
    render() {
        return (
            <div>
                <h1>Government</h1>
                 <Route path='/world/:worldid/gov/:govid' component={Government} />
            </div>
        )
    }
}
