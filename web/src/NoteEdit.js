import React from "react"
import {Form,Button,Modal} from 'react-bootstrap'
import auth from "./auth";

export default class NoteEdit extends React.Component{

    constructor(){
        super()
        this.state={
            error:false
        }
        this.componentDidMount=this.componentDidMount.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.submitHandler=this.submitHandler.bind(this)
        this.errorHandler=this.errorHandler.bind(this)
        this.closeError=this.closeError.bind(this)
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

    errorHandler(){
        this.props.onHide()
        this.setState({
            error:true
        })
    }

    closeError(){
        this.setState({
            error:false
        })
    }

    submitHandler(event){
        event.preventDefault()

        let body={...this.state}
        console.log(body)
        fetch("http://localhost:5000/api/updatenote",
        {
            method:"POST",
            headers:{
                'Authorization':localStorage.getItem("token"),
                'Content-type':'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(res=>{
            if(res.status>=200 && res.status<=300){
                window.location.reload()
            }
            else if(res.status===401){
                auth.logout()
            }
            else{
                this.errorHandler()
            }
        })
        .catch(err=>{
            console.log(err)
            this.errorHandler()
        })
    }

    render(){
        return(
            <div>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header closeButton style={{"font-family":"monospace"}}>Edit Note</Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Control style={{"fontSize":"25px","fontWeight":"bold","fontFamily":"monospace"}} name="notetitle" type="text" value={this.state.title} placeholder="Enter Title Here" onChange={this.handleChange}></Form.Control>
                            <Form.Control style={{"marginTop":"10px","fontSize":"20px","fontFamily":"monospace"}} rows="7" name="inputnote" as="textarea" value={this.state.note} placeholder="Enter Note Here" onChange={this.handleChange}></Form.Control>
                            <Button style={{"marginTop":"10px"}} type="submit">Done</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.error} onHide={this.closeError}>
                    <Modal.Body>Failed to Save Edited Note. Please Check Your Connection and Try Again.</Modal.Body>
                </Modal>
            </div>
        )
    }
}