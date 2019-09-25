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


import './World.css'


export default class World extends Component {
    constructor(){
        super();
        this.state = {
            updateWorld: false,
            menu: false,
            editName: '',
            worldName: ''
        }
    }

    componentDidMount(){
        this.getName()
    }

    getName = () => {
        const id = this.props.match.params.worldid
        axios.get(`/api/world/${id}`)
            .then(name => {
                console.log(name)
                this.setState({
                    worldName: name.data[0].name
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleUpdateToggle = () => {
        this.setState({
            updateWorld: !this.state.updateWorld
        })
    }

    handleMenuSlide = () => {
        this.setState({
            menu: !this.state.menu
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
        console.log(this.state.worldName)
        const {worldName} = this.state
        const id = this.props.match.params.worldid
        return (
            <div className='world-main-container'>
                <Link to='/dashboard'><button className='all-worlds btn'>Back To All Worlds</button></Link> 
                <div className='edit-container'>
                    {!this.state.updateWorld
                    ?
                    <div className='world-title-container'> 
                        <h1 className='world-title'>{worldName}</h1>
                        <button onClick={this.handleUpdateToggle} className='toggle btn'>Edit World Name</button>
                    
                    </div>
                    :
                    (<div className='create-world-form update'>
                        <label>New Name:</label>
                        <input 
                        className='form-input'
                        type='text' 
                        name='name'
                        onChange={this.handleOnChange}
                        value={this.state.editName} />
                        <div className='form-btn-container'>
                            <button onClick={this.handleUpdateToggle} className='form-btn update-btn'>Cancel</button>
                            <button onClick={this.updateWorld} className='form-btn update-btn'>Submit</button>
                        </div>
                    </div>)
                    } 
                </div>
                <div className='world-navbar'>
                <Link to={`/world/${id}/climate`}><button className='catagory btn'>Geography</button></Link>
                    <Link to={`/world/${id}/gov`}><button className='catagory btn'>Governments</button></Link>
                    <Link to={`/world/${id}/lang`}><button className='catagory btn'>Languages</button></Link>
                    <Link to={`/world/${id}/magic`}><button className='catagory btn'>Magic</button></Link>
                    <Link to={`/world/${id}/myth`}><button className='catagory btn'>Myths and Folklore</button></Link>
                    <Link to={`/world/${id}/prof`}><button className='catagory btn'>Professions</button></Link>
                    <Link to={`/world/${id}/religion`}><button className='catagory btn'>Religions</button></Link>
                    <Link to={`/world/${id}/trade`}><button className='catagory btn'>Trade and Resources</button></Link>
                </div>
                 <div>
               
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
