import React from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import auth from './auth'

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
    
    submitHandler(event){
        event.preventDefault()
        let body={...this.state}
        console.log(body)
        fetch("http://localhost:5000/api/addnote",
        {
            method:"POST",
            headers:{
                'Authorization':localStorage.getItem('token'),
                'Content-type':'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(res=>{
            if (res.status>=200 && res.status<=300){
                window.location.reload()
            }
            else if (res.status===401){
                auth.logout()
            }
            else{
                this.props.onHide()
                this.props.errorCallBack(res.status)
            }
        })
        .catch(err=>{
            this.props.onHide()
            this.props.errorCallBack(err)
        })
    }

    render(){
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>Add New Note</Modal.Header>

                <Modal.Body>  
                    <Form onSubmit={this.submitHandler}>
                    <Form.Control style={{"fontSize":"25px","fontWeight":"bold"}} name="notetitle" type="text" placeholder="Enter Title Here" value={this.state.currenttitle} onChange={this.handleChange}/>
                    <Form.Control style={{"marginTop":"10px","fontSize":"20px"}} name="inputnote" rows="7" as="textarea" placeholder="Enter Note Here" value={this.state.currentnote} onChange={this.handleChange}/>

                    <Button style={{"marginTop":"10px"}} type="submit">Save Note</Button>
                    </Form>
                </Modal.Body>

            </Modal>
        )
    }
}