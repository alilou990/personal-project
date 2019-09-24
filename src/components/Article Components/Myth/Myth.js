import React, { Component } from 'react'
import axios from 'axios';




export default class Myth extends Component {
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
            editContent: this.props.myth.content,
            editImg: this.props.myth.img,
            editTitle: this.props.myth.title
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
        axios.delete(`/api/worlds/myth/mytharticle/${id}`)
            .then(res => {
                this.props.getMyths()
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
        axios.put(`/api/worlds/myth/mytharticle/${id}`, body)
            .then(res => {
                this.props.getMyths()
                this.handleEditToggle()
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() {
        const {myth} = this.props
        return (
            <div className='main-article-container'>
                {!this.state.editStatus
                ?
                (<div className='article-container'>
                    <div className='main-content'>
                        <h1 className='article-title'>{myth.title}</h1>
                        <img src={myth.img} alt='article pic' className='article-image'/>
                        <div className='content-container'>
                            <p className='article-content'>{myth.content}</p>
                        </div>
                        <div className='btn-container'>
                            <button onClick={this.handleEditToggle} className='article btn'>Edit</button>
                            <button onClick={() => this.deleteArticle(myth.id)} className='article btn'>Delete</button>
                        </div>
                    </div>
                </div>)
                :
                (<div>
                     <label>Title</label>
                    <input
                       defaultValue={myth.title}
                    //    type='text'
                       name='editTitle'
                       onChange={this.handleOnChange}
                    //    value={this.state.editTitle} 
                       />
                    <label>Content</label>
                    <input 
                        defaultValue={myth.content}
                    //    type='text'
                       name='editContent'
                       onChange={this.handleOnChange}
                    //    value={this.state.editContent} 
                       />
                    <label>Image</label>
                    <input 
                       defaultValue={myth.img}
                    //    type='url'
                       name='editImg'
                       onChange={this.handleOnChange}
                    //    value={this.state.editImythe} 
                    /> 
                    <button onClick={this.handleEditToggle}>Cancel</button>
                    <button onClick={() => this.updateArticle(myth.id)}>Submit</button>
                </div>)
                }
            </div>
        )
    }
}
