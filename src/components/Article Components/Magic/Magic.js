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
                    <div className='main-content'>
                        <h1 className='article-title'>{mag.title}</h1>
                        <img src={mag.img} alt='article pic' className='article-image'/>
                        <section className='content-container'>
                        <p className='article-content'>{mag.content}</p>
                        </section>
                        <div className='btn-container'>
                            <button onClick={this.handleEditToggle} className='article btn'>Edit</button>
                            <button onClick={() => this.deleteArticle(mag.id)} className='article btn'>Delete</button>
                        </div>
                    </div>
                </div>)
                :
                (<div className='edit-form'>
                <h1 className='form-title'>Edit Article</h1>
                <div className='add-form-title-conatiner'>
                    <input 
                        className='add-title-input input add-input'
                        defaultValue={mag.title}
                       name='editTitle'
                       onChange={this.handleOnChange} />
                </div>
                <div className='add-form-image-conatiner'>
                    <input 
                        className='add-image-input input add-input'
                        placeholder='Image URL'
                        type='url'
                        defaultValue={mag.img}
                        name='editImg'
                        onChange={this.handleOnChange}/> 
                </div>
                <div className='add-form-content-conatiner'>
                    <textarea 
                        className='add-content-input input add-input'
                        row='10'
                        cols='80'
                        placeholder='Content'
                        defaultValue={mag.content}
                        name='editContent'
                        onChange={this.handleOnChange}/>
                </div>
                <div className='add-btn-container'>
                    <button onClick={this.handleEditToggle} className='add-article-btn'>Cancel</button>
                    <button onClick={() => this.updateArticle(mag.id)} className='add-article-btn'>Submit</button>
                </div>
            </div>)}
            </div>
        )
    }
}
