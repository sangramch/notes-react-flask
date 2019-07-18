import React from 'react'
import {Modal,Button,Form} from 'react-bootstrap'

export default class NewNote extends React.Component{

    constructor(){
        super()
        this.state={
            currentnote:"",
            currenttitle:""
        }

        this.handleChange=this.handleChange.bind(this)
        this.submitHandler=this.submitHandler.bind(this)
    }

    handleChange(event){
        if(event.target.name === "notetitle"){
            this.setState({
                currenttitle: event.target.value
            })
        }
        else{
            this.setState({
                currentnote: event.target.value
            })
        }
    }
    
    submitHandler(){
        fetch("http://localhost:5000/api/addnote",
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
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>Add New Note</Modal.Header>

                <Modal.Body>  
                    <Form onSubmit={this.submitHandler}>
                    <Form.Control style={{"font-size":"25px","font-weight":"bold"}} name="notetitle" type="text" placeholder="Enter Title Here" value={this.state.currenttitle} onChange={this.handleChange}/>
                    <Form.Control style={{"margin-top":"10px","font-size":"20px"}} name="inputnote" rows="7" as="textarea" placeholder="Enter Note Here" value={this.state.currentnote} onChange={this.handleChange}/>

                    <Button style={{"margin-top":"10px"}} type="submit">Save Note</Button>
                    </Form>
                </Modal.Body>

            </Modal>
        )
    }
}