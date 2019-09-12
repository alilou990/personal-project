import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import Language from './Language'

export default class LanguageDash extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:id/lang/:langid' component={Language} />
            </div>
        )
    }
}
