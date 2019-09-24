import React, { Component } from 'react'
import axios from 'axios'

import Myth from './Myth'

export default class MythDash extends Component {
    constructor(){
        super();
        this.state = {
            myths: [],
            content: '',
            img: '',
            title: '',
            createMyth: false
        }
    }

    componentDidMount(){
        this.getMyths()
    }


    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddToggle = () => {
        this.setState({
            createMyth: !this.state.createMyth
        })
    }

    getMyths = () => {
        const worldid = this.props.match.params.worldid
        axios.get(`/api/worlds/${worldid}/myth`)
            .then(res => {
                console.log(res)
                this.setState({
                    myths: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    addMyth = () => {
        console.log(this.props)
        const worldid = this.props.match.params.worldid
        const {content, img, title} = this.state
        const body = {
            content,
            worldid,
            img,
            title
        }
        axios.post(`/api/worlds/${worldid}/myth`, body)
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
        const mappedMyths = this.state.myths.map((myth, i) => {
            return(
                <Myth myth={myth} key={i} getMyths={this.getMyths} content={this.state.content} title={this.state.title} img={this.state.img}/>
            )
        })
        return (
            <div className='catagory-title-container'>
                <h1 className='catagory-title'>Myths and Folklore</h1>
                {!this.state.createMyth
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
                    <button onClick={this.addMyth}>Submit</button>
                </div>)}
                <div className='mapped-article-container'>
                    {mappedMyths}
                </div>
            </div>
        )
    }
}
