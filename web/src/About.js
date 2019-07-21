import React from 'react'
import NavBar from './NavBar'


export default class About extends React.Component{
    constructor(){
        super()
        this.state={
        }
        this.componentDidMount=this.componentDidMount.bind(this)
    }

    componentDidMount(){
        console.log(localStorage.getItem("loggedin"))
        this.setState({
            login:localStorage.getItem("loggedin")
        })
        console.log(this.state)
    }

    logOut(){
        window.location.reload()
    }
    render(){
        return(
            <div>
                About Page
            </div>
        )
    }
}