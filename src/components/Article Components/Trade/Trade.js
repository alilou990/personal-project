import React, { Component } from 'react'
import axios from 'axios';




export default class Trade extends Component {
    //have state to store article object
    constructor(){
        super();
        this.state = {
            editStatus: false,
            editContent: '',
            editImg: '',
            editTitle: ''
        }
    }

    componentDidMount(){
        this.setState({
            editContent: this.props.trade.content,
            editImg: this.props.trade.img,
            editTitle: this.props.trade.title
        })
    }

    handleEditToggle = () => {
        this.setState({
            editStatus: !this.state.editStatus
        })
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    deleteArticle = (id) => {
        axios.delete(`/api/worlds/trade/tradearticle/${id}`)
            .then(res => {
                this.props.getTrades()
            }) 
            .catch(error => {
                console.log(error)
            })
    }

    updateArticle = (id) => {
        const {editContent, editImg, editTitle} = this.state
        const body = {
            editContent,
            editImg,
            editTitle
        }
        axios.put(`/api/worlds/trade/tradearticle/${id}`, body)
            .then(res => {
                this.props.getTrades()
                this.handleEditToggle()
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() {
        const {trade} = this.props
        return (
            <div className='main-article-container'>
                {!this.state.editStatus
                ?
                (<div className='article-container'>
                    <div className='main-content'>
                        <h1 className='catagory-title'>{trade.title}</h1>
                        <img src={trade.img} alt='article pic' className='article-image'/>
                        <div className='content-container'>
                            <p className='article-content'>{trade.content}</p>
                        </div>
                        <div className='btn-container'>
                            <button onClick={this.handleEditToggle} className='article btn'>Edit</button>
                            <button onClick={() => this.deleteArticle(trade.id)} className='article btn'>Delete</button>
                        </div>
                    </div>
                </div>)
                :
                (<div>
                     <label>Title</label>
                    <input
                       defaultValue={trade.title}
                    //    type='text'
                       name='editTitle'
                       onChange={this.handleOnChange}
                    //    value={this.state.editTitle} 
                       />
                    <label>Content</label>
                    <input 
                        defaultValue={trade.content}
                    //    type='text'
                       name='editContent'
                       onChange={this.handleOnChange}
                    //    value={this.state.editContent} 
                       />
                    <label>Image</label>
                    <input 
                       defaultValue={trade.img}
                    //    type='url'
                       name='editImg'
                       onChange={this.handleOnChange}
                    //    value={this.state.editItradee} 
                    /> 
                    <button onClick={this.handleEditToggle}>Cancel</button>
                    <button onClick={() => this.updateArticle(trade.id)}>Submit</button>
                </div>)
                }
            </div>
        )
    }
}
