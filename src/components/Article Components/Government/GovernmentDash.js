import React, { Component } from 'react'
// import {Route, Link, Switch} from 'react-router-dom'
import axios from 'axios';

import Government from './Government'


export default class GovernmentDash extends Component {
    constructor(){
        super();
        this.state = {
            govs: [],
            content: '',
            img: '',
            title: '',
            createGov: false
        }
    }

    componentDidMount(){
        this.getGovs()
    }


    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddToggle = () => {
        this.setState({
            createGov: !this.state.createGov
        })
    }

    getGovs = () => {
        const worldid = this.props.match.params.worldid
        axios.get(`/api/worlds/${worldid}/gov`)
            .then(res => {
                this.setState({
                    govs: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    addGov = () => {
        const worldid = this.props.match.params.worldid
        const {content, img, title} = this.state
        const body = {
            content,
            worldid,
            img,
            title
        }
        axios.post(`/api/worlds/${worldid}/gov`, body)
            .then(res => {
                this.componentDidMount()
                this.handleAddToggle()
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const mappedGovs = this.state.govs.map((gov, i) => {
            return(
                <Government gov={gov} key={i} getGovs={this.getGovs} content={this.state.content} title={this.state.title} img={this.state.img}/>
            )
        })
        return (
            <div className='catagory-title-container'>
                <h1 className='catagory-title'>Governments</h1>
                {!this.state.createGov
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
                        <button onClick={this.addGov} className='add-article-btn'>Submit</button>
                    </div>
                </div>)}
                <div className='mapped-article-container'>
                    {mappedGovs}
                </div>
            </div>
        )
    }
}
