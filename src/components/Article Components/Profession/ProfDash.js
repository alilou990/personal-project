import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import axios from 'axios'

import Profession from './Profession'

export default class ProfDash extends Component {
    constructor(){
        super();
        this.state = {
            profs: [],
            content: '',
            img: '',
            title: '',
            createProf: false
        }
    }

    componentDidMount(){
        this.getProfs()
    }


    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddToggle = () => {
        this.setState({
            createProf: !this.state.createProf
        })
    }

    getProfs = () => {
        const worldid = this.props.match.params.worldid
        axios.get(`/api/worlds/${worldid}/prof`)
            .then(res => {
                console.log(res)
                this.setState({
                    prods: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    addProf = () => {
        console.log(this.props)
        const worldid = this.props.match.params.worldid
        const {content, img, title} = this.state
        const body = {
            content,
            worldid,
            img,
            title
        }
        axios.post(`/api/worlds/${worldid}/prof`, body)
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
        const mappedProfs = this.state.profs.map((prof, i) => {
            return(
                <Profession prof={prof} key={i} />
            )
            
            // return(
            //     <div key={i}>
            //         <Link to={`/world/${worldid}/climate/${climate.id}`}><h1>{climate.title}</h1></Link>
            //     </div>
            // )
        })
        return (
            <div className='prof-title-container'>
                {!this.state.createProf
                ?
                (<div>
                <button onClick={this.handleAddToggle}>Add An Article</button>
                {mappedProfs}
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
                    <button onClick={this.addProf}>Submit</button>
                </div>)}
                <Route path='/world/:worldid/prof/:profid' component={Profession} />
            </div>
        )
    }
}
