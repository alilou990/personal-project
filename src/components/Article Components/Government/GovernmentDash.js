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
                console.log(res)
                this.setState({
                    govs: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    addGov = () => {
        console.log(this.props)
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
        // const worldid = this.props.match.params.worldid
        console.log(this.state)
        const mappedGovs = this.state.govs.map((gov, i) => {
            return(
                <Government gov={gov} key={i} />
            )
            
            // return(
            //     <div key={i}>
            //         <Link to={`/world/${worldid}/climate/${climate.id}`}><h1>{climate.title}</h1></Link>
            //     </div>
            // )
        })
        return (
            <div className='gov-title-container'>
                {!this.state.createGov
                ?
                (<div>
                <button onClick={this.handleAddToggle}>Add An Article</button>
                {mappedGovs}
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
            {/* <Switch>
                <Route path='/world/:worldid/climate/:climateid' component={Climate} />
            </Switch> */}
            </div>
        )
    }
}
