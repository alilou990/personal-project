import React, { Component } from 'react'
import axios from 'axios';


import Climate from './Climate'

import './ClimateDash.css'


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

   

    render() {
        const mappedClimates = this.state.climates.map((climate, i) => {
            return(
            <div>
                <Climate key={i} climate={climate}  getClimates={this.getClimates} content={this.state.content} title={this.state.title} img={this.state.img} />
                
            </div>
            )
        })
        return (
            <div className='catagory-title-container'>
                <h1 className='catagory-title'>Climate</h1>
                {!this.state.createClimate
                ?
                (<div>
                    <button onClick={this.handleAddToggle} className='add-article btn'>Add An Article</button>
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
                <div className='mapped-article-container'>
                    {mappedClimates}
                </div>
            </div>
        )
    }
}