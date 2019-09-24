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
                    <button onClick={this.addGov}>Submit</button>
                </div>)}
                <div className='mapped-article-container'>
                    {mappedGovs}
                </div>
            </div>
        )
    }
}
