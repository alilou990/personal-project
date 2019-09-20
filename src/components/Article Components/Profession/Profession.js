import React, { Component } from 'react'

export default class Myth extends Component {
    render() {
        const {prof} = this.props
        return (
            <div>
                <h1>{prof.title}</h1>
                <img src={prof.img} alt='article pic'/>
                <p>{prof.content}</p>
            </div>
        )
    }
}
