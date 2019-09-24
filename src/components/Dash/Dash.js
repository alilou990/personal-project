import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import './Dash.css'

export default class Dash extends Component {
    constructor(){
        super();
        this.state = {
            worlds: [],
            name: '',
            createWorld: false,
            updateWorld: false
        }
    }

    componentDidMount() {
        this.getWorlds()
    }

    handleAddToggle = () => {
        this.setState({
            createWorld: !this.state.createWorld
        })
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    getWorlds = () => {
        axios.get('api/worlds')
            .then(worlds => {
                console.log(worlds)
                this.setState({
                    worlds: worlds.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    addWorld = (id) => {
        const {name} = this.state
        // const id = this.props.match.params.id
        const body = {
            name
        }
        axios.post(`/api/worlds/${id}`, body)
            .then(res => {
                console.log(res)
                this.handleAddToggle()
                this.componentDidMount()
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const mappedWorlds = this.state.worlds.map((world, i) => {
           return(
                    <div className='links-container' world={world} key={i}>
                        {/* need an image here  */}
                        <Link to={`/world/${world.id}`} key={i}> <button className='world-links'>{world.name}</button></Link>
                    </div>
    
           )
           })
        console.log(this.props)
        return (
            <div className='main-world-display'>
               <h1 className='page-title'>Your Worlds</h1> 
               <div className='desktop-view-container'>
               {mappedWorlds} 
               </div>
                {!this.state.createWorld
                ?
                (<div className='world-container'>
                    <div className='create-btn-container'>
                    <button className='create-btn' onClick={this.handleAddToggle}>Create A New World</button>
                    </div>
                    
                </div>)
                :
                (<div className='create-world-form'>
                        <label >Name Your New World:</label>
                        <input 
                            className='form-input'
                            type='text' 
                            name='name'
                            onChange={this.handleOnChange}
                            value={this.state.name} />
                    <div className='form-btn-container'>
                        <button className='form-btn' onClick={this.handleAddToggle}>Cancel</button>
                        <button className='form-btn' onClick={this.addWorld}>Submit</button>
                        
                    </div>
                </div>)}
                
                
                
            </div>
        )
    }
}
