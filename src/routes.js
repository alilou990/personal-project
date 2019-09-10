import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Auth from './components/Auth/Auth'
import Dash from './components/Dash/Dash'
import World from './components/World/World'


export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dash} />
        <Route path='/world/:worldid' component={World} />
    </Switch>
)