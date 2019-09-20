import React, { Component } from 'react'
import axios from 'axios';




export default class Magic extends Component {
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
            editContent: this.props.mag.content,
            editImg: this.props.mag.img,
            editTitle: this.props.mag.title
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
        axios.delete(`/api/worlds/mag/magarticle/${id}`)
            .then(res => {
                this.props.getMags()
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
        axios.put(`/api/worlds/mag/magarticle/${id}`, body)
            .then(res => {
                this.props.getMags()
                this.handleEditToggle()
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() {
        const {mag} = this.props
        return (
            <div className='main-article-container'>
                {!this.state.editStatus
                ?
                (<div className='article-container'>
                    <h1>{mag.title}</h1>
                    <img src={mag.img} alt='article pic' className='article-image'/>
                    <p>{mag.content}</p>
                    <button onClick={this.handleEditToggle}>Edit</button>
                    <button onClick={() => this.deleteArticle(mag.id)}>Delete</button>
                </div>)
                :
                (<div>
                     <label>Title</label>
                    <input
                       defaultValue={mag.title}
                    //    type='text'
                       name='editTitle'
                       onChange={this.handleOnChange}
                    //    value={this.state.editTitle} 
                       />
                    <label>Content</label>
                    <input 
                        defaultValue={mag.content}
                    //    type='text'
                       name='editContent'
                       onChange={this.handleOnChange}
                    //    value={this.state.editContent} 
                       />
                    <label>Image</label>
                    <input 
                       defaultValue={mag.img}
                    //    type='url'
                       name='editImg'
                       onChange={this.handleOnChange}
                    //    value={this.state.editImage} 
                    /> 
                    <button onClick={() => this.updateArticle(mag.id)}>Submit</button>
                </div>)
                }
            </div>
        )
    }
}
