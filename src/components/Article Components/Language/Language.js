import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import InnerLang from './InnerLang'

export default class Language extends Component {
    render() {
        return (
            <div>
                 <Route path='/world/:worldid/lang/:langid' component={InnerLang} />
            </div>
        )
    }
}
