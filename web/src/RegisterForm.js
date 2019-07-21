import React from "react"
import {Modal,Form,Button,Container,Row} from "react-bootstrap"
import auth from './auth'

export default class RegisterForm extends React.Component{
    constructor(){
        super()
        this.state={
            firstname:"",
            lastname:"",
            userid:"",
            password:"",
            error:false,
            errortext:""
        }

        this.handleChange=this.handleChange.bind(this)
        this.submitRegisterInfo=this.submitRegisterInfo.bind(this)
        this.errorDismiss=this.errorDismiss.bind(this)
    }

    handleChange(event){
        let name=event.target.name
        if(name==="firstname"){
            this.setState({firstname:event.target.value})
        }
        else if(name==="lastname"){
            this.setState({lastname:event.target.value})
        }
        else if(name==="userid"){
            this.setState({userid:event.target.value})
        }
        else{
            this.setState({password:event.target.value})
        }
    }

    submitRegisterInfo(event){
        event.preventDefault()
        let firstname=this.state.firstname
        let lastname=this.state.lastname
        let userid=this.state.userid
        let password=this.state.password

        if(firstname===""){
            this.setState({
                error:true,
                errortext:"Firstname Cannot be Empty"
            })
        }
        else if(lastname===""){
            this.setState({
                error:true,
                errortext:"Lastname Cannot be Empty"
            })
        }
        else if(userid===""){
            this.setState({
                error:true,
                errortext:"Email Cannot be Empty"
            })
        }
        else if(password===""){
            this.setState({
                error:true,
                errortext:"Password Cannot be Empty"
            })
        }
        else{
            auth.register(firstname,lastname,userid,password,this.props.registerCallback,this.props.errorCallback)
        }
    }

    errorDismiss(){
        this.setState({
            error:false,
            errortext:""
        })
    }

    render(){
        return(
            <Container>
                <Form onSubmit={this.submitRegisterInfo}>
                    <Form.Control style={{"fontFamily":"monospace","marginTop":"10px"}} type="text" name="firstname" placeholder="First Name" value={this.state.firstname} onChange={this.handleChange}></Form.Control>
                    <Form.Control style={{"fontFamily":"monospace","marginTop":"10px"}} type="text" name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={this.handleChange}></Form.Control>
                    <Form.Control style={{"fontFamily":"monospace","marginTop":"10px"}} type="email" name="userid" placeholder="Email" value={this.state.userid} onChange={this.handleChange}></Form.Control>
                    <Form.Control style={{"fontFamily":"monospace","marginTop":"10px"}} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></Form.Control>
                    <Button style={{"fontFamily":"monospace","marginTop":"10px"}} type="submit">Register</Button>
                </Form>
                <Modal show={this.state.error} onHide={this.errorDismiss}>
                    <Modal.Body>{this.state.errortext}</Modal.Body>
                </Modal>
            </Container>
        )
    }
}