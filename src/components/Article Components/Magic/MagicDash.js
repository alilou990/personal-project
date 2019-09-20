import React, { Component } from 'react'
import {Route}from 'react-router-dom'
import axios from 'axios'

import Magic from './Magic'

export default class MagicDash extends Component {
    constructor(){
        super();
        this.state = {
            mags: [],
            content: '',
            img: '',
            title: '',
            createMag: false
        }
    }

    componentDidMount(){
        this.getMags()
    }


    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddToggle = () => {
        this.setState({
            createMag: !this.state.createMag
        })
    }

    getMags = () => {
        const worldid = this.props.match.params.worldid
        axios.get(`/api/worlds/${worldid}/mag`)
            .then(res => {
                console.log(res)
                this.setState({
                    mags: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    addMag = () => {
        console.log(this.props)
        const worldid = this.props.match.params.worldid
        const {content, img, title} = this.state
        const body = {
            content,
            worldid,
            img,
            title
        }
        axios.post(`/api/worlds/${worldid}/mag`, body)
            .then(res => {
                this.componentDidMount()
                this.handleAddToggle()
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        console.log(this.state)
        const mappedMags = this.state.mags.map((mag, i) => {
            return(
                <Magic mag={mag} key={i} getMags={this.getMags} content={this.state.content} title={this.state.title} img={this.state.img}/>
            )
        })
        return (
            <div className='mag-title-container'>
                {!this.state.createMag
                ?
                (<div>
                <button onClick={this.handleAddToggle}>Add An Article</button>
                {mappedMags}
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
                    <button onClick={this.addMag}>Submit</button>
                </div>)}

            <Route path='/world/:worldid/magic/:magicid' component={Magic} />
            </div>
        )
    }
}
