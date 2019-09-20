import React, { Component } from 'react'
// import {Route, Link, Switch} from 'react-router-dom'
import axios from 'axios';
// import Dropzone from 'react-dropzone'
// import {GridLoader} from 'react-spinners'

import Climate from './Climate'


export default class ClimateDash extends Component {
    constructor(){
        super();
        this.state = {
            climates: [],
            content: '',
            title: '',
            img: '',
            url: '',
            createClimate: false,
            isUploading: false
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

    updatedArticle = (data) => {
        this.setState({
            climates: data
        })
    }

   

    render() {
        const mappedClimates = this.state.climates.map((climate, i) => {
            return(
            <div>
                <Climate key={i} climate={climate}  getClimates={this.getClimates} content={this.state.content} title={this.state.title} img={this.state.img} />
                
            </div>
            )
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
                    <label>Content</label>
                    <input 
                       type='text'
                       name='content'
                       onChange={this.handleOnChange}
                       value={this.state.content} />
                    <label>Image</label>
                    <input 
                       type='url'
                       name='img'
                       onChange={this.handleOnChange}
                       value={this.state.image} /> 
                    <button onClick={() => this.addClimate(this.props.match.params.worldid)}>Submit</button>
                </div>)}
            </div>
        )
    }
}