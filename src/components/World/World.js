import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import Character from '../Article Components/Character/Character'
import Climate from '../Article Components/Climate/Climate'
import Government from '../Article Components/Government/Government'
import Img from '../Article Components/Img/Img'
import Language from '../Article Components/Language/Language'
import Magic from '../Article Components/Magic/Magic'
import Military from '../Article Components/Military/Military'
import Myth from '../Article Components/Myth/Myth'
import Profession from '../Article Components/Profession/Profession'
import Religion from '../Article Components/Religion/Religion'
import Trade from '../Article Components/Trade/Trade'

export default class World extends Component {
    constructor(){
        super();
        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                


                <div>
                    <Route path='/world/:worldid/characters' component={Character}/>
                    <Route path='/world/:worldid/climate' component={Climate}/>
                    <Route path='/world/:worldid/gov' component={Government} />
                    <Route path='/world/:worldid/img' component={Img} />
                    <Route path='/world/:worldid/language' component={Language} />
                    <Route path='/world/:worldid/magic' component={Magic} />
                    <Route path='/world/:worldid/military' component={Military} />
                    <Route path='/world/:worldid/myth' component={Myth} />
                    <Route path='/world/:worldid/profession' component={Profession} />
                    <Route path='/world/:worldid/religion' component={Religion} />
                    <Route path='/world/:worldid/trade' component={Trade} />
                    </div>
            </div>
        )
    }
}
