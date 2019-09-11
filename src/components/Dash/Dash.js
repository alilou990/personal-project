import React, { Component } from 'react'
import axios from 'axios'

export default class Dash extends Component {
    constructor(){
        super();
        this.state = {
            worlds: {}
        }
    }
    
    getWorlds = () => {
        axios.get('api/worlds')
            .then(worlds => {
                this.setState({
                    ...this.state.worlds,
                    user: worlds.data
                })
            })
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
