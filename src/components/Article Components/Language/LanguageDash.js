import React, { Component } from 'react'
import axios from 'axios'

import Language from './Language'

export default class LanguageDash extends Component {
    constructor(){
        super();
        this.state = {
            langs: [],
            content: '',
            img: '',
            title: '',
            createLang: false
        }
    }

    componentDidMount(){
        this.getLangs()
    }


    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddToggle = () => {
        this.setState({
            createLang: !this.state.createLang
        })
    }

    getLangs = () => {
        const worldid = this.props.match.params.worldid
        axios.get(`/api/worlds/${worldid}/lang`)
            .then(res => {
                console.log(res)
                this.setState({
                    langs: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    addLang = () => {
        console.log(this.props)
        const worldid = this.props.match.params.worldid
        const {content, img, title} = this.state
        const body = {
            content,
            worldid,
            img,
            title
        }
        axios.post(`/api/worlds/${worldid}/lang`, body)
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
        const mappedLangs = this.state.langs.map((lang, i) => {
            return(
                <Language lang={lang} key={i} getLangs={this.getLangs} content={this.state.content} title={this.state.title} img={this.state.img}/>
            )
        })
        return (
            <div className='catagory-title-container'>
                <h1 className='catagory-title'>Languages</h1>
                {!this.state.createLang
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
                    <button onClick={this.addLang}>Submit</button>
                </div>)}
                <div className='mapped-article-container'>
                   {mappedLangs}
                </div>
            </div>
        )
    }
}
