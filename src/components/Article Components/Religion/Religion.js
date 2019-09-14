import React, { Component } from 'react'


export default class Religion extends Component {
    render() {
        const {religion} = this.props
        return (
            <div>
                <h1>{religion.title}</h1>
                <img src={religion.img} alt='article pic'/>
                <p>{religion.content}</p>
            </div>
        )
    }
}
