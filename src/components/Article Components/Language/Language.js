import React, { Component } from 'react'
import axios from 'axios';




export default class Language extends Component {
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
            editContent: this.props.lang.content,
            editImg: this.props.lang.img,
            editTitle: this.props.lang.title
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
        axios.delete(`/api/worlds/lang/langarticle/${id}`)
            .then(res => {
                this.props.getLangs()
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
        axios.put(`/api/worlds/lang/langarticle/${id}`, body)
            .then(res => {
                this.props.getLangs()
                this.handleEditToggle()
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() {
        const {lang} = this.props
        return (
            <div className='main-article-container'>
                {!this.state.editStatus
                ?
                (<div className='article-container'>
                    <h1>{lang.title}</h1>
                    <img src={lang.img} alt='article pic' className='article-image'/>
                    <p>{lang.content}</p>
                    <button onClick={this.handleEditToggle}>Edit</button>
                    <button onClick={() => this.deleteArticle(lang.id)}>Delete</button>
                </div>)
                :
                (<div>
                     <label>Title</label>
                    <input
                       defaultValue={lang.title}
                    //    type='text'
                       name='editTitle'
                       onChange={this.handleOnChange}
                    //    value={this.state.editTitle} 
                       />
                    <label>Content</label>
                    <input 
                        defaultValue={lang.content}
                    //    type='text'
                       name='editContent'
                       onChange={this.handleOnChange}
                    //    value={this.state.editContent} 
                       />
                    <label>Image</label>
                    <input 
                       defaultValue={lang.img}
                    //    type='url'
                       name='editImg'
                       onChange={this.handleOnChange}
                    //    value={this.state.editImage} 
                    /> 
                    <button onClick={() => this.updateArticle(lang.id)}>Submit</button>
                </div>)
                }
            </div>
        )
    }
}
