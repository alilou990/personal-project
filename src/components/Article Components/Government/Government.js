import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import InnerGovernment from './InnerGovernment';

export default class Government extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/gov/:govid' component={InnerGovernment} />
            </div>
        )
    }
}
