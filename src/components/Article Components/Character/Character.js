import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import InnerCharacter from './InnerCharacter'

export default class Character extends Component {
    render() {
        return (
            <div>
                <Route path='/world/:worldid/character/:charid' component={InnerCharacter} />

            </div>
        )
    }
}
