import React, { Component } from 'react'
import axios from 'axios';




export default class Religion extends Component {
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
            editContent: this.props.religion.content,
            editImg: this.props.religion.img,
            editTitle: this.props.religion.title
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
        axios.delete(`/api/worlds/religion/religionarticle/${id}`)
            .then(res => {
                this.props.getReligions()
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
        axios.put(`/api/worlds/religion/religionarticle/${id}`, body)
            .then(res => {
                this.props.getReligions()
                this.handleEditToggle()
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() {
        const {religion} = this.props
        return (
            <div className='main-article-container'>
                {!this.state.editStatus
                ?
                (<div className='article-container'>
                    <div className='main-content'>
                        <h1 className='catagory-title'>{religion.title}</h1>
                        <img src={religion.img} alt='article pic' className='article-image'/>
                        <div className='content-container'>
                            <p className='article-content'>{religion.content}</p>
                        </div>
                        <div className='btn-container'>
                            <button onClick={this.handleEditToggle} className='article btn'>Edit</button>
                            <button onClick={() => this.deleteArticle(religion.id)} className='article btn'>Delete</button>
                        </div>
                    </div>
                </div>)
                :
                (<div>
                     <label>Title</label>
                    <input
                       defaultValue={religion.title}
                    //    type='text'
                       name='editTitle'
                       onChange={this.handleOnChange}
                    //    value={this.state.editTitle} 
                       />
                    <label>Content</label>
                    <input 
                        defaultValue={religion.content}
                    //    type='text'
                       name='editContent'
                       onChange={this.handleOnChange}
                    //    value={this.state.editContent} 
                       />
                    <label>Image</label>
                    <input 
                       defaultValue={religion.img}
                    //    type='url'
                       name='editImg'
                       onChange={this.handleOnChange}
                    //    value={this.state.editIreligione} 
                    /> 
                    <button onClick={this.handleEditToggle}>Cancel</button>
                    <button onClick={() => this.updateArticle(religion.id)}>Submit</button>
                </div>)
                }
            </div>
        )
    }
}
