import React, { Component } from 'react'

export default class Myth extends Component {
    render() {
        const {myth} = this.props
        return (
            <div>
                <h1>{myth.title}</h1>
                <img src={myth.img} alt='article pic'/>
                <p>{myth.content}</p>
            </div>
        )
    }
}
