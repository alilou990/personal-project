import React, { Component } from 'react'


export default class GovernmentDash extends Component {
    render() {
        const {gov} = this.props
        return (
            <div>
                <h1>{gov.title}</h1>
                <img src={gov.img} alt='article pic'/>
                <p>{gov.content}</p>
            </div>
        )
    }
}