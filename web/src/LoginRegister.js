import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import {Modal,Button,Container} from 'react-bootstrap'

export default class LoginRegister extends React.Component{
    constructor(){
        super()
        this.state={
            displaystatus:"login",
            registermodal:false,
            loginerror:false,
            errorname:""
        }
        this.handleClick=this.handleClick.bind(this)
        this.onRegister=this.onRegister.bind(this)
        this.registerModalHide=this.registerModalHide.bind(this)
        this.onRegisterError=this.onRegisterError.bind(this)
        this.closeRegisterError=this.closeRegisterError.bind(this)
    }

    handleClick(event){
        if(event.target.name==="register"){
            this.setState({
                displaystatus:"register"
            })
        }
        else{
            this.setState({
                displaystatus:"login"
            })
        }
    }

    onRegister(){
        this.setState({
            registermodal:true,
            displaystatus:"login"
        })
    }

    onRegisterError(statuscode,message){
        if(statuscode===401){
            if (message==="Email Error"){
                this.setState({
                    errorname:"Email Already Exists",
                    loginerror:true
            })}
            else if(message==="Null Error"){
                this.setState({
                    errorname:"Empty Values Not Allowed",
                    loginerror:true
                })
            }
        }
        else if(statuscode===1000){
            this.setState({
                errorname:"Network Error",
                loginerror:true
            })
        }
        else{
            this.setState({
                errorname:"Internal Server Error",
                loginerror:true
            })
        }
    }

    closeRegisterError(){
        this.setState({
            errorname:"",
            loginerror:false
        })
    }

    registerModalHide(){
        this.setState({
            registermodal:false
        })
    }

    render(){
        let string
        if(this.state.displaystatus==="login"){
            string=<Container>
                <LoginForm loginCallback={this.props.loginCallback} errorCallback={this.props.errorCallback}></LoginForm>
                <div style={{"fontFamily":"monospace","marginTop":"30px"}}>Don't have an account yet? <a href="#" name="register" onClick={this.handleClick}>Register</a></div>
            </Container>
        }
        else{
            string=<Container>
                    <RegisterForm registerCallback={this.onRegister} errorCallback={this.onRegisterError}></RegisterForm>
                    <div style={{"fontFamily":"monospace","marginTop":"30px"}}>Already have an account? <a href="#" name="login" onClick={this.handleClick}>Login</a></div>
                </Container>
        }
        return (
            <div style={{"paddingTop":"50px"}}>
                {string}
                <Modal show={this.state.registermodal} onHide={this.registerModalHide}>
                    <Modal.Body>Registered Successfully</Modal.Body>
                </Modal>
                <Modal show={this.state.loginerror} onHide={this.closeRegisterError}>
                    <Modal.Body>{this.state.errorname}</Modal.Body>
                </Modal>
            </div>)
    }
}
