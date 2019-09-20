import React, { Component } from 'react'


export default class Trade extends Component {
    render() {
        const {trade} = this.props
        return (
            <div>
                <h1>{trade.title}</h1> */}
                <img src={trade.img} alt='article pic'/>
                <p>{trade.content}</p>
            </div>
        )
    }
}
