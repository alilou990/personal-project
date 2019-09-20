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
                    <h1>{prof.title}</h1>
                    <img src={prof.img} alt='article pic' className='article-iprofe'/>
                    <p>{prof.content}</p>
                    <button onClick={this.handleEditToggle}>Edit</button>
                    <button onClick={() => this.deleteArticle(prof.id)}>Delete</button>
                </div>)
                :
                (<div>
                     <label>Title</label>
                    <input
                       defaultValue={prof.title}
                    //    type='text'
                       name='editTitle'
                       onChange={this.handleOnChange}
                    //    value={this.state.editTitle} 
                       />
                    <label>Content</label>
                    <input 
                        defaultValue={prof.content}
                    //    type='text'
                       name='editContent'
                       onChange={this.handleOnChange}
                    //    value={this.state.editContent} 
                       />
                    <label>Image</label>
                    <input 
                       defaultValue={prof.img}
                    //    type='url'
                       name='editImg'
                       onChange={this.handleOnChange}
                    //    value={this.state.editIprofe} 
                    /> 
                    <button onClick={() => this.updateArticle(prof.id)}>Submit</button>
                </div>)
                }
            </div>
        )
    }
}
