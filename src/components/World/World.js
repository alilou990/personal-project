import React, { Component } from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import axios from 'axios'

import CharacterDash from '../Article Components/Character/Character'
import ClimateDash from '../Article Components/Climate/ClimateDash'
import GovernmentDash from '../Article Components/Government/GovernmentDash'
import LanguageDash from '../Article Components/Language/LanguageDash'
import MagicDash from '../Article Components/Magic/MagicDash'
import ReligionDash from '../Article Components/Religion/ReligionDash'
import TradeDash from '../Article Components/Trade/Trade'


export default class World extends Component {
    constructor(){
        super();
        this.state = {
            updateWorld: false,
            name: ''
        }
    }

    handleUpdateToggle = () => {
        this.setState({
            updateWorld: !this.state.updateWorld
        })
    }

    updateWorld = () => {
        const id = this.props.match.params.worldid
        const {name} = this.state
        const body = {
            name,
            id
        }
        axios.put(`/api/worlds/${id}`, body)
            .then(res => {
                console.log(res.data)
                this.handleUpdateToggle()
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const id = this.props.match.params.worldid
        return (
            <div>
                 <div>
                {!this.state.updateWorld
                ?
                <div>
                    <h1>{}</h1>
                    <button onClick={this.handleUpdateToggle}>Edit</button>
                   <Link to='/dashboard'><button>Back</button></Link> 
                </div>
                :
                (<div className='update-world-form'>
                    <label>New Name:</label>
                    <input 
                    type='text' 
                    name='name'
                    onChange={this.handleOnChange}
                    value={this.state.name} />
                    <button onClick={this.updateWorld}>Submit</button>
                </div>)
                }
                <Link to={`/world/${id}/climate`}><button>Climate</button></Link>
                <Link to={`/world/${id}/gov`}><button>Government</button></Link>
                <Link to={`/world/${id}/lang`}><button>Language</button></Link>
                <Link to={`/world/${id}/magic`}><button>Magic</button></Link>
                <Link to={`/world/${id}/religion`}><button>Religion</button></Link>
                <Link to={`/world/${id}/trade`}><button>Trade</button></Link>


               
                    <Switch>
                        <Route path='/world/:worldid/characters' component={CharacterDash}/>
                        <Route path='/world/:worldid/climate' component={ClimateDash}/>
                        <Route path='/world/:worldid/gov' component={GovernmentDash} />
                        <Route path='/world/:worldid/lang' component={LanguageDash} />
                        <Route path='/world/:worldid/magic' component={MagicDash} />
                        <Route path='/world/:worldid/religion' component={ReligionDash} />
                        <Route path='/world/:worldid/trade' component={TradeDash} />
                    </Switch>
                </div>
            </div>
        )
    }
}
