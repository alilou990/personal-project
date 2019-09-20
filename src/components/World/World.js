import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom'
import axios from 'axios'

import CharacterDash from '../Article Components/Character/Character'
import ClimateDash from '../Article Components/Climate/ClimateDash'
import GovernmentDash from '../Article Components/Government/GovernmentDash'
import LanguageDash from '../Article Components/Language/LanguageDash'
import MagicDash from '../Article Components/Magic/MagicDash'
import MythDash from '../Article Components/Myth/MythDash'
import ProfDash from '../Article Components/Profession/ProfDash'
import ReligionDash from '../Article Components/Religion/ReligionDash'
import TradeDash from '../Article Components/Trade/TradeDash'


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
                <Link to={`/world/${id}/climate`}><button>Climates</button></Link>
                    <Link to={`/world/${id}/gov`}><button>Governments</button></Link>
                    <Link to={`/world/${id}/lang`}><button>Languages</button></Link>
                    <Link to={`/world/${id}/magic`}><button>Magic</button></Link>
                    <Link to={`/world/${id}/myth`}><button>Myths and Folklore</button></Link>
                    <Link to={`/world/${id}/prof`}><button>Professions</button></Link>
                    <Link to={`/world/${id}/religion`}><button>Religions</button></Link>
                    <Link to={`/world/${id}/trade`}><button>Trade and Resources</button></Link>
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
                </div>

                    <Route path='/world/:worldid/characters' component={CharacterDash}/>
                    <Route path='/world/:worldid/climate' component={ClimateDash}/>
                    <Route path='/world/:worldid/gov' component={GovernmentDash} />
                    <Route path='/world/:worldid/lang' component={LanguageDash} />
                    <Route path='/world/:worldid/magic' component={MagicDash} />
                    <Route path='/world/:worldid/myth' component={MythDash} />
                    <Route path='/world/:worldid/prof' component={ProfDash} />
                    <Route path='/world/:worldid/religion' component={ReligionDash} />
                    <Route path='/world/:worldid/trade' component={TradeDash} />
            </div>
        )
    }
}
