import React, { Component } from 'react'
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
        })
        return (
            <div className='catagory-title-container'>
                <h1 className='catagory-title'>Trade and Resources</h1>
                {!this.state.createTrade
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
                        <button onClick={this.addTrade} className='add-article-btn'>Submit</button>
                    </div>
                </div>)}
                <div className='mapped-article-container'>
                    {mappedTrades}
                </div>
            </div>
        )
    }
}
