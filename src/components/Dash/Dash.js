import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


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

    handleUpdateToggle = () => {
        this.setState({
            updateWorld: !this.state.updateWorld
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

    updateWorld = (id) => {
        const {name} = this.state
        const body = {
            name
        }
        axios.put(`/api/worlds/${id}`, body)
            .then(res => {
                console.log(res.data)
                this.handleUpdateToggle()
                this.componentDidMount()
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const mappedWorlds = this.state.worlds.map((world, i) => {
           return(
                <div key={i}>
                    {/* need an image here  */}
                    <Link to={`/world/${world.id}`} key={i}> <p>{world.name}</p></Link>
                    <button onClick={this.handleUpdateToggle}>Edit</button>
                </div>
           )
           })
        return (
            <div className='main-world-display'>
                {!this.state.createWorld
                ?
                (<div>
                <button onClick={this.handleAddToggle}>Create New World</button>
                {mappedWorlds}    
                </div>)
                :
                (<div className='create-world-form'>
                    <label>Name:</label>
                    <input 
                    type='text' 
                    name='name'
                    onChange={this.handleOnChange}
                    value={this.state.name} />
                    <button onClick={this.addWorld}>Submit</button>
                </div>)
                }
                {!this.state.updateWorld
                ?
                null
                :
                (<div className='update-world-form'>
                    <label>New Name:</label>
                    <input 
                    type='text' 
                    name='name'
                    onChange={this.handleOnChange}
                    value={this.state.name} />
                    <button onClick={() => this.updateWorld(this.props.match.params.id)}>Submit</button>
                </div>)
                }
                
            </div>
        )
    }
}
