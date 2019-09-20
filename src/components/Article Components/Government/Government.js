import React, { Component } from 'react'
import axios from 'axios';




export default class Government extends Component {
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
            editContent: this.props.gov.content,
            editImg: this.props.gov.img,
            editTitle: this.props.gov.title
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
        axios.delete(`/api/worlds/gov/govarticle/${id}`)
            .then(res => {
                this.props.getGovs()
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
        axios.put(`/api/worlds/gov/govarticle/${id}`, body)
            .then(res => {
                this.props.getGovs()
                this.handleEditToggle()
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() {
        const {gov} = this.props
        return (
            <div className='main-article-container'>
                {!this.state.editStatus
                ?
                (<div className='article-container'>
                    <h1>{gov.title}</h1>
                    <img src={gov.img} alt='article pic' className='article-image'/>
                    <p>{gov.content}</p>
                    <button onClick={this.handleEditToggle}>Edit</button>
                    <button onClick={() => this.deleteArticle(gov.id)}>Delete</button>
                </div>)
                :
                (<div>
                     <label>Title</label>
                    <input
                       defaultValue={gov.title}
                    //    type='text'
                       name='editTitle'
                       onChange={this.handleOnChange}
                    //    value={this.state.editTitle} 
                       />
                    <label>Content</label>
                    <input 
                        defaultValue={gov.content}
                    //    type='text'
                       name='editContent'
                       onChange={this.handleOnChange}
                    //    value={this.state.editContent} 
                       />
                    <label>Image</label>
                    <input 
                       defaultValue={gov.img}
                    //    type='url'
                       name='editImg'
                       onChange={this.handleOnChange}
                    //    value={this.state.editImage} 
                    /> 
                    <button onClick={() => this.updateArticle(gov.id)}>Submit</button>
                </div>)
                }
            </div>
        )
    }
}
