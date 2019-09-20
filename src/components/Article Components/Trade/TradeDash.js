import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import axios from 'axios'

import Trade from './Trade'

export default class TradeDash extends Component {
    constructor(){
        super();
        this.state = {
            trades: [],
            content: '',
            img: '',
            title: '',
            createTrade: false
        }
    }

    componentDidMount(){
        this.getTrades()
    }


    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddToggle = () => {
        this.setState({
            createTrade: !this.state.createTrade
        })
    }

    getTrades = () => {
        const worldid = this.props.match.params.worldid
        axios.get(`/api/worlds/${worldid}/trade`)
            .then(res => {
                console.log(res)
                this.setState({
                    trade: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    addTrade = () => {
        console.log(this.props)
        const worldid = this.props.match.params.worldid
        const {content, img, title} = this.state
        const body = {
            content,
            worldid,
            img,
            title
        }
        axios.post(`/api/worlds/${worldid}/trade`, body)
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
        const mappedTrades = this.state.trades.map((trade, i) => {
            return(
                <Trade trade={trade} key={i} getTrades={this.getTrades} content={this.state.content} title={this.state.title} img={this.state.img}/>
            )
            
            // return(
            //     <div key={i}>
            //         <Link to={`/world/${worldid}/climate/${climate.id}`}><h1>{climate.title}</h1></Link>
            //     </div>
            // )
        })
        return (
            <div className='trade-title-container'>
                {!this.state.createTrade
                ?
                (<div>
                <button onClick={this.handleAddToggle}>Add An Article</button>
                {mappedTrades}
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
                    <button onClick={this.addTrade}>Submit</button>
                </div>)}
                <Route path='/world/:worldid/trade/:tradeid' component={Trade} />
            </div>
        )
    }
}
