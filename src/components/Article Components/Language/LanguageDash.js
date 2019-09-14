import React, { Component } from 'react'
import {Route} from 'react-router-dom'
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
                <Language lang={lang} key={i} />
            )
            
            // return(
            //     <div key={i}>
            //         <Link to={`/world/${worldid}/climate/${climate.id}`}><h1>{climate.title}</h1></Link>
            //     </div>
            // )
        })
        return (
            <div className='lang-title-container'>
                {!this.state.createLang
                ?
                (<div>
                <button onClick={this.handleAddToggle}>Add An Article</button>
                {mappedLangs}
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
            {/* <Switch>
                <Route path='/world/:worldid/climate/:climateid' component={Climate} />
            </Switch> */}
            <Route path='/world/:worldid/lang/:langid' component={Language} />
            </div>
        )
    }
}
