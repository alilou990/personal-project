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

    render() {
        const mappedWorlds = this.state.worlds.map((world, i) => {
           return(
                <div key={i}>
                    {/* need an image here  */}
                    <Link to={`/world/${world.id}`} key={i}> <p>{world.name}</p></Link>
                </div>
           )
           })
        console.log(this.props)
        return (
            <div >
                {!this.state.createWorld
                ?
                (<div className='main-world-display'>
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
                </div>)}
                
                
            </div>
        )
    }
}
