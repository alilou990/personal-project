import React, { Component } from 'react'
// import axios from 'axios';


export default class Climate extends Component {
    //have state to store article object
    constructor(){
        super();
        this.state = {
            article: {}
        }
    }

    componentDidMount(){
        // this.getOneArticle()
        
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
            <div>
                <h1>{climate.title}</h1>
                <img src={climate.img} alt='article pic'/>
                <p>{climate.content}</p>
            </div>
        )
    }
}
