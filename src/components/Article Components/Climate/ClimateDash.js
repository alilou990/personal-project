import React, { Component } from 'react'
// import {Route, Link, Switch} from 'react-router-dom'
import axios from 'axios';

import Climate from './Climate'


export default class ClimateDash extends Component {
    constructor(){
        super();
        this.state = {
            climates: [],
            content: '',
            img: '',
            title: '',
            createClimate: false
        }
    }

    componentDidMount(){
        this.getClimates()
    }


    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddToggle = () => {
        this.setState({
            createClimate: !this.state.createClimate
        })
    }

    getClimates = () => {
        const id = this.props.match.params.worldid
        
        axios.get(`/api/worlds/${id}/climate`)
            .then(climates => {
                this.setState({
                    climates: climates.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    addClimate = (worldid) => {
        console.log(this.props)
        const {content, img, title} = this.state
        const body = {
            content,
            img,
            title
        }
        axios.post(`/api/worlds/${worldid}/climate`, body)
            .then(res => {
                this.componentDidMount()
                this.handleAddToggle()
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        // const worldid = this.props.match.params.worldid
        console.log(this.state)
        const mappedClimates = this.state.climates.map((climate, i) => {
            return(
            <Climate climate={climate} key={i} />
            )
            
            // return(
            //     <div key={i}>
            //         <Link to={`/world/${worldid}/climate/${climate.id}`}><h1>{climate.title}</h1></Link>
            //     </div>
            // )
        })
        return (
            <div className='climate-title-container'>
                {!this.state.createClimate
                ?
                (<div>
                <button onClick={this.handleAddToggle}>Add An Article</button>
                {mappedClimates}
                </div>)
                :
                (<div>
                    <label>Title</label>
                    <input 
                       type='text'
                       name='title'
                       onChange={this.handleOnChange}
                       value={this.state.title} />
                    <label>Image</label>
                    <input 
                       type='url'
                       name='img'
                       onChange={this.handleOnChange}
                       value={this.state.image} /> 
                    <label>Content</label>
                    <input 
                       type='text'
                       name='content'
                       onChange={this.handleOnChange}
                       value={this.state.content} />
                    <button onClick={() => this.addClimate(this.props.match.params.worldid)}>Submit</button>
                </div>)}
            {/* <Switch>
                <Route path='/world/:worldid/climate/:climateid' component={Climate} />
            </Switch> */}
            </div>
        )
    }
}