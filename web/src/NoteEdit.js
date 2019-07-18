import React from "react"
import {Form,Button,Modal} from 'react-bootstrap'

export default class NoteEdit extends React.Component{

    constructor(){
        super()
        this.state={
        }
        this.componentDidMount=this.componentDidMount.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.submitHandler=this.submitHandler.bind(this)
    }

    componentDidMount(){
        this.setState({
            id:this.props.id,
            title:this.props.title,
            note:this.props.note
        })
    }

    handleChange(event){
        if(event.target.name === "notetitle"){
            this.setState({
                title: event.target.value
            })
        }
        else{
            this.setState({
                note: event.target.value
            })
        }
    }

    submitHandler(){
        fetch("http://localhost:5000/api/updatenote",
        {
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then(res=>res.resolve())
        .catch(err=>console.log(err))
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton style={{"font-family":"monospace"}}>Edit Note</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Control style={{"font-size":"25px","font-weight":"bold","font-family":"monospace"}} name="notetitle" type="text" value={this.state.title} placeholder="Enter Title Here" onChange={this.handleChange}></Form.Control>
                        <Form.Control style={{"margin-top":"10px","font-size":"20px","font-family":"monospace"}} rows="7" name="inputnote" as="textarea" value={this.state.note} placeholder="Enter Note Here" onChange={this.handleChange}></Form.Control>
                        <Button style={{"margin-top":"10px"}} type="submit">Done</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}