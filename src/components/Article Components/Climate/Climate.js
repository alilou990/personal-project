import React, { Component } from 'react'
import axios from 'axios';

import './climate.css'


export default class Climate extends Component {
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
        //use id passed into function as parameter at end of endpoint, on backend pull off params and use that id to delete article
        // /api/world/climate/climatearticle/:id (this should work for the update and delete, just send update info on body, delete does not need body)
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
                // this.props.updatedArticle(res.data)
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

    
    //have a componentDidMount that does axios get with id from props.match and set res on state
    render() {
        const {climate} = this.props
        return (
            <div className='main-article-container'>
                {!this.state.editStatus
                ?
                (<div className='article-container'>
                    <h1>{climate.title}</h1>
                    <img src={climate.img} alt='article pic' className='article-image'/>
                    <p>{climate.content}</p>
                    <button onClick={this.handleEditToggle}>Edit</button>
                    <button onClick={() => this.deleteArticle(climate.id)}>Delete</button>
                </div>)
                :
                (<div>
                     <label>Title</label>
                    <input
                       defaultValue={climate.title}
                    //    type='text'
                       name='editTitle'
                       onChange={this.handleOnChange}
                    //    value={this.state.editTitle} 
                       />
                    <label>Content</label>
                    <input 
                        defaultValue={climate.content}
                    //    type='text'
                       name='editContent'
                       onChange={this.handleOnChange}
                       value={this.state.editContent} 
                       />
                    <label>Image</label>
                    <input 
                       defaultValue={climate.img}
                    //    type='url'
                       name='editImg'
                       onChange={this.handleOnChange}
                       value={this.state.editImage} 
                    /> 
                    <button onClick={() => this.updateArticle(climate.id)}>Submit</button>
                </div>)
                }
            </div>
        )
    }
}
