import React, { Component } from 'react'


export default class Language extends Component {
    render() {
        const {lang} = this.props
        return (
            <div>
                <h1>{lang.title}</h1>
                <img src={lang.img} alt='article pic'/>
                <p>{lang.content}</p>
            </div>
        )
    }
}