import React from "react"
import {Modal,Form,Button,Container,Row} from "react-bootstrap"
import auth from "./auth"

export default class LoginForm extends React.Component{
    constructor(){
        super()
        this.state={
            userid:"",
            password:"",
            error:false,
            errortext:true
        }

        this.submitLoginInfo=this.submitLoginInfo.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.errorDismiss=this.errorDismiss.bind(this)
    }

    submitLoginInfo(event){
        event.preventDefault()
        let userid=this.state.userid
        let password=this.state.password
        if(userid===""){
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
            auth.login(userid,password,this.props.loginCallback,this.props.errorCallback)
        }
    }

    handleChange(event){
        if(event.target.name==="userid")
            this.setState({userid:event.target.value})
        else
            this.setState({password:event.target.value})
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
                <Form onSubmit={this.submitLoginInfo}>
                    <Form.Control style={{"fontFamily":"monospace","marginTop":"10px"}} name="userid" placeholder="Email" value={this.state.userid} onChange={this.handleChange}></Form.Control>
                    <Form.Control style={{"fontFamily":"monospace","marginTop":"10px"}} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></Form.Control>
                    <Button style={{"fontFamily":"monospace","marginTop":"10px"}} type="submit">Login</Button>
                </Form>
                <Modal show={this.state.error} onHide={this.errorDismiss}>
                    <Modal.Body>{this.state.errortext}</Modal.Body>
                </Modal>
            </Container>
        )
    }
}