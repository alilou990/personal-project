import React, { Component } from 'react'
import {Switch, Route, Link} from 'react-router-dom'

import Character from '../Article Components/Character/Character'
import Climate from '../Article Components/Climate/Climate'
import Government from '../Article Components/Government/GovernmentDash'
import Img from '../Article Components/Img/Img'
import Language from '../Article Components/Language/LanguageDash'
import Magic from '../Article Components/Magic/MagicDash'
import Military from '../Article Components/Military/MilitaryDash'
import Myth from '../Article Components/Myth/MythDash'
import Profession from '../Article Components/Profession/ProfessionDash'
import Religion from '../Article Components/Religion/ReligionDash'
import Trade from '../Article Components/Trade/Trade'

export default class World extends Component {
    constructor(){
        super();
        this.state = {
            
        }
    }
    render() {
        const id = this.props.match.params.worldid
        console.log(id)
        return (
            <div>
                <Link to={`/world/${id}/climate`}><button>Climate</button></Link>
                <Link to={`/world/${id}/gov`}><button>Government</button></Link>
                <Link to={`/world/${id}/img`}><button>Images</button></Link>
                <Link to={`/world/${id}/lang`}><button>Language</button></Link>
                <Link to={`/world/${id}/magic`}><button>Magic</button></Link>
                <Link to={`/world/${id}/military`}><button>Military</button></Link>
                <Link to={`/world/${id}/myth`}><button>Myth</button></Link>
                <Link to={`/world/${id}/profession`}><button>Professions</button></Link>
                <Link to={`/world/${id}/religion`}><button>Religion</button></Link>
                <Link to={`/world/${id}/trade`}><button>Trade</button></Link>


                <div>
                    <Switch>

                        <Route exact path='/world/:worldid/characters' component={Character}/>
                        <Route exact path={`/world/:worldid/climate`}component={Climate}/>
                        <Route exact path='/world/:worldid/gov' component={Government} />
                        <Route exact path='/world/:worldid/img' component={Img} />
                        <Route exact path='/world/:iworldd/lang' component={Language} />
                        <Route exact path='/world/:worldid/magic' component={Magic} />
                        <Route exact path='/world/:worldd/military' component={Military} />
                        <Route exact path='/world/:worldid/myth' component={Myth} />
                        <Route exact path='/world/:worldid/profession' component={Profession} />
                        <Route exact path='/world/:worldid/religion' component={Religion} />
                        <Route exact path='/world/:worldid/trade' component={Trade} />
                    </Switch>
                </div>
            </div>
        )
    }
}
