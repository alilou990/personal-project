import React, { Component } from 'react'
import axios from 'axios';

import './climate.css'


export default class Climate extends Component {
    //have state store article object
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
            editContent: this.props.climate.content,
            editImg: this.props.climate.img,
            editTitle: this.props.climate.title
        })
    }

    handleEditToggle = () => {
        this.setState({
            editStatus: !this.state.editStatus
        })
    }

    handleOnChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    deleteArticle = (id) => {
        axios.delete(`/api/worlds/climate/climatearticle/${id}`)
            .then(res => {
                this.props.getClimates()
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
        console.log(body)
        axios.put(`/api/worlds/climate/climatearticle/${id}`, body)
            .then(res => {
                this.props.getClimates()
                this.handleEditToggle()
            })
            .catch(error => {
                console.log(error)
            })
    }
    


    // getOneArticle = () => {
    //     const {worldid, climateid} = this.props.match.params

    //     // const {climateid} = this.props.match
    //     axios.get(`/api/worlds/climate/${worldid}?climateid=${climateid}`)
    //         .then(res => {
    //             console.log(res)
    //             this.setState({
    //                 article: res.data
    //             })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
    
    render() {
        const {climate} = this.props
        return (
            <div className='main-article-container'>
                {!this.state.editStatus
                ?
                (<div className='article-container'>
                    <div className='main-content'>
                        <h1 className='article-title'>{climate.title}</h1>
                        <img src={climate.img} alt='article pic' className='article-image'/>
                        <div className='content-container'>
                            <p className='article-content'>{climate.content}</p>
                        </div>
                        <div className='btn-container'>
                            <button onClick={this.handleEditToggle} className='article btn'>Edit</button>
                            <button onClick={() => this.deleteArticle(climate.id)} className='article btn'>Delete</button>
                        </div>
                    </div>
                </div>)
                :
                (<div>
                     <label>Title</label>
                    <input
                       defaultValue={climate.title}
                       name='editTitle'
                       onChange={this.handleOnChange}
                       />
                    <label>Content</label>
                    <input 
                        defaultValue={climate.content}
                       name='editContent'
                       onChange={this.handleOnChange}
                       />
                    <label>Image</label>
                    <input 
                       defaultValue={climate.img}
                       name='editImg'
                       onChange={this.handleOnChange}
                    /> 
                    <button onClick={this.handleEditToggle}>Cancel</button>
                    <button onClick={() => this.updateArticle(climate.id)}>Submit</button>
                </div>)
                }
            </div>
        )
    }
}
