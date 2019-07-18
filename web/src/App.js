import React from 'react'
import './App.css'
import Notes from "./Notes"
import NewNote from "./NewNote"
import {Modal,Button,Form} from 'react-bootstrap'

export default class App extends React.Component{
    constructor(){
        super()
        this.state={
            modalview:false
        }
        this.openModal=this.openModal.bind(this)
        this.closeModal=this.closeModal.bind(this)
    }

    openModal(){
        this.setState({
            modalview:true
        })
    }

    closeModal(){
        this.setState({
            modalview:false
        })
    }


    render(){
        return (
            <div>
                <Button id="newnotebtn" onClick={this.openModal}>+</Button>
                <Notes></Notes>
                <NewNote show={this.state.modalview} onHide={this.closeModal}></NewNote>
            </div>
        )
    }
}
