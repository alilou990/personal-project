import React, { Component } from 'react'
import axios from 'axios'

import Religion from './Religion'

export default class ReligionDash extends Component {
    constructor(){
        super();
        this.state = {
            religions: [],
            content: '',
            img: '',
            title: '',
            createReligion: false
        }
    }

    componentDidMount(){
        this.getReligion()
    }


    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddToggle = () => {
        this.setState({
            createReligion: !this.state.createReligion
        })
    }

    getReligion = () => {
        const worldid = this.props.match.params.worldid
        axios.get(`/api/worlds/${worldid}/religion`)
            .then(res => {
                console.log(res)
                this.setState({
                    religions: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    addReligion = () => {
        console.log(this.props)
        const worldid = this.props.match.params.worldid
        const {content, img, title} = this.state
        const body = {
            content,
            worldid,
            img,
            title
        }
        axios.post(`/api/worlds/${worldid}/religion`, body)
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
        const mappedReligions = this.state.religions.map((religion, i) => {
            return(
                <Religion religion={religion} key={i} getReligions={this.getReligions} content={this.state.content} title={this.state.title} img={this.state.img}/>
            )
        })
        return (
            <div className='catagory-title-container'>
                <h1 className='catagory-title'>Religions</h1>
                {!this.state.createReligion
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
                    <button onClick={this.addReligion}>Submit</button>
                </div>)}
                <div className='mapped-article-container'>
                    {mappedReligions}
                </div>
            </div>
        )
    }
}
