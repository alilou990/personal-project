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
                        <section className='content-container'>
                            <p className='article-content'>{prof.content}</p>
                        </section>
                        <div className='btn-container'>
                            <button onClick={this.handleEditToggle} className='article btn'>Edit</button>
                            <button onClick={() => this.deleteArticle(prof.id)} className='article btn'>Delete</button>
                        </div>
                    </div>
                </div>)
                :
                (<div className='edit-form'>
                <h1 className='form-title'>Edit Article</h1>
                <div className='add-form-title-conatiner'>
                    <input 
                        className='add-title-input input add-input'
                        defaultValue={prof.title}
                       name='editTitle'
                       onChange={this.handleOnChange} />
                </div>
                <div className='add-form-image-conatiner'>
                    <input 
                        className='add-image-input input add-input'
                        placeholder='Image URL'
                        type='url'
                        defaultValue={prof.img}
                        name='editImg'
                        onChange={this.handleOnChange}/> 
                </div>
                <div className='add-form-content-conatiner'>
                    <textarea 
                        className='add-content-input input add-input'
                        row='10'
                        cols='80'
                        placeholder='Content'
                        defaultValue={prof.content}
                        name='editContent'
                        onChange={this.handleOnChange}/>
                </div>
                <div className='add-btn-container'>
                    <button onClick={this.handleEditToggle} className='add-article-btn'>Cancel</button>
                    <button onClick={() => this.updateArticle(prof.id)} className='add-article-btn'>Submit</button>
                </div>
            </div>)}
            </div>
        )
    }
}
