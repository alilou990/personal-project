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
                <h1 className='catagory-title'>Geography</h1>
                {!this.state.createClimate
                ?
                (<div>
                    <button onClick={this.handleAddToggle} className='add-article btn'>Add An Article</button>
                </div>)
                :
                (<div className='add-article-form'>
                    <h1 className='form-title'>Add Article</h1>
                    <div className='add-form-title-conatiner'>
                        <input 
                            className='add-title-input input add-input'
                            placeholder='Title'
                            type='text'
                            name='title'
                            onChange={this.handleOnChange}
                            value={this.state.title} />
                    </div>
                    <div className='add-form-image-conatiner'>
                        <input 
                            className='add-image-input input add-input'
                            placeholder='Image URL'
                            type='url'
                            name='img'
                            onChange={this.handleOnChange}
                            value={this.state.image} /> 
                    </div>
                    <div className='add-form-content-conatiner'>
                        <textarea 
                            className='add-content-input input add-input'
                            row='10'
                            cols='80'
                            placeholder='Content'
                            name='content'
                            onChange={this.handleOnChange}
                            value={this.state.content} />
                    </div>
                    <div className='add-btn-container'>
                        <button onClick={this.handleAddToggle} className='add-article-btn'>Cancel</button>
                        <button onClick={() => this.addClimate(this.props.match.params.worldid)} className='add-article-btn'>Submit</button>
                    </div>
                </div>)}
                <div className='mapped-article-container'>
                    {mappedClimates}
                </div>
            </div>
        )
    }
}