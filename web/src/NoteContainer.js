import React from "react"
import {Button,Modal} from 'react-bootstrap'
import NoteEdit from "./NoteEdit.js"

export default class NoteContainer extends React.Component{

    constructor(){
        super()
        this.state={
            showEditModal:false
        }
        this.handleClick=this.handleClick.bind(this)
        this.handleEdit=this.handleEdit.bind(this)
        this.closeEdit=this.closeEdit.bind(this)
    }

    handleClick(){
        fetch("http://localhost:5000/api/deletenote",
            {
                method: "POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    "id":this.props.id
                })
            }
        )
        this.props.onDelete(this.props.id)
    }

    handleEdit(){
        this.setState({
            showEditModal:true
        })
        this.props.onHide()
    }

    closeEdit(){
        this.setState({
            showEditModal:false
        })
    }

    render(){
        return (
            <div>
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton><h4><b style={{"font-family":"monospace"}}>{this.props.title}</b></h4></Modal.Header>
                <Modal.Body style={{"font-family":"monospace"}}>
                    {this.props.note}
                </Modal.Body>
                <Modal.Footer><Button variant="warning" onClick={this.handleEdit}>Edit</Button></Modal.Footer>
            </Modal>
            <NoteEdit note={this.props.note} id={this.props.id} title={this.props.title} onHide={this.closeEdit} show={this.state.showEditModal}></NoteEdit>
            </div>
        )
    }
}