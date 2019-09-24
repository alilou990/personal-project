import React, { Component } from 'react'
import axios from 'axios';




export default class Profession extends Component {
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
            editContent: this.props.prof.content,
            editImg: this.props.prof.img,
            editTitle: this.props.prof.title
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
        axios.delete(`/api/worlds/prof/profarticle/${id}`)
            .then(res => {
                this.props.getProfs()
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
        axios.put(`/api/worlds/prof/profarticle/${id}`, body)
            .then(res => {
                this.props.getProfs()
                this.handleEditToggle()
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() {
        const {prof} = this.props
        return (
            <div className='main-article-container'>
                {!this.state.editStatus
                ?
                (<div className='article-container'>
                    <div className='main-content'>
                        <h1 className='article-title'>{prof.title}</h1>
                        <img src={prof.img} alt='article pic' className='article-image'/>
                        <div className='content-container'>
                            <p className='article-content'>{prof.content}</p>
                        </div>
                        <div className='btn-container'>
                            <button onClick={this.handleEditToggle} className='article btn'>Edit</button>
                            <button onClick={() => this.deleteArticle(prof.id)} className='article btn'>Delete</button>
                        </div>
                    </div>
                </div>)
                :
                (<div>
                     <label>Title</label>
                    <input
                       defaultValue={prof.title}
                       name='editTitle'
                       onChange={this.handleOnChange}
                       />
                    <label>Content</label>
                    <input 
                        defaultValue={prof.content}
                       name='editContent'
                       onChange={this.handleOnChange}
                       />
                    <label>Image</label>
                    <input 
                       defaultValue={prof.img}
                       name='editImg'
                       onChange={this.handleOnChange}
                    /> 
                    <button onClick={this.handleEditToggle}>Cancel</button>
                    <button onClick={() => this.updateArticle(prof.id)}>Submit</button>
                </div>)
                }
            </div>
        )
    }
}
