import React, { Component } from 'react'

export default class Magic extends Component {
    render() {
        const {mag} = this.props
        return (
            <div>
                <h1>{mag.title}</h1>
                <img src={mag.img} alt='article pic'/>
                <p>{mag.content}</p>
            </div>
        )
    }
}