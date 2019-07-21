import React from 'react'
import './App.css'
import Notes from "./Notes"
import NewNote from "./NewNote"
import {Modal,Button} from 'react-bootstrap'
import LoginRegister from "./LoginRegister"
import NavBar from './NavBar'
import About from './About'

export default class App extends React.Component{
    constructor(){
        super()
        this.state={
            submiterror:false,
            modalview:false,
            loggedin:false,
            loginerror:false,
            aboutpage:false,
            errorname:"",
            username:""
        }
        this.openModal=this.openModal.bind(this)
        this.closeModal=this.closeModal.bind(this)
        this.submitError=this.submitError.bind(this)
        this.closeSubmit=this.closeSubmit.bind(this)
        this.loginSuccess=this.loginSuccess.bind(this)
        this.componentDidMount=this.componentDidMount.bind(this)
        this.logOut=this.logOut.bind(this)
        this.loginError=this.loginError.bind(this)
        this.closeLoginError=this.closeLoginError.bind(this)
        this.openAbout=this.openAbout.bind(this)
        this.closeAbout=this.closeAbout.bind(this)
    }

    componentDidMount(){
        if (localStorage.getItem("loggedin")==='true'){
            this.setState({
                loggedin:true,
                username:localStorage.getItem("username")
            })
        }
    }

    openAbout(){
        this.setState({
            aboutpage:true
        })
    }

    closeAbout(){
        this.setState({
            aboutpage:false
        })
    }

    loginSuccess(username){
        this.setState({
            username:username,
            loggedin:true
        })
    }

    loginError(statuscode){
        if(statuscode===401){
            this.setState({
                errorname:"Authentication Failed",
                loginerror:true
            })
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

    closeLoginError(){
        this.setState({
            errorname:"",
            loginerror:false
        })
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

    closeSubmit(){
        this.setState({
            submiterror:false
        })
    }

    submitError(){
        this.setState({
            submiterror:true
        })
    }

    logOut(){
        this.setState({
            loggedin:false,
            aboutpage:false
        })
    }

    render(){
        let mainscreen
        if(this.state.aboutpage===true){
            mainscreen=<About></About>
        }

        else{
            if(this.state.loggedin===true){
                mainscreen= (
                    <div>
                        <Notes logoutCallback={this.logOut}></Notes>
                        <NewNote errorCallBack={this.submitError} show={this.state.modalview} onHide={this.closeModal}></NewNote>
                        <Modal show={this.state.submiterror} onHide={this.closeSubmit}>
                            <Modal.Body>Failed to Save Note. Please Check your Connection and Try Again.</Modal.Body>
                        </Modal>
                    </div>
                )
            }
            else{
                mainscreen=(
                    <div>
                        <LoginRegister loginCallback={this.loginSuccess} errorCallback={this.loginError}></LoginRegister>
                        <Modal show={this.state.loginerror} onHide={this.closeLoginError}>
                            <Modal.Body>{this.state.errorname}</Modal.Body>
                        </Modal>
                    </div>
                )
            }
        }

        return(
            <div>
                <NavBar userName={this.state.username} homeCallback={this.closeAbout} aboutCallback={this.openAbout} loggedin={this.state.loggedin} onNewnote={this.openModal} onLogout={this.logOut}></NavBar>
                {mainscreen}
            </div>
        )
    }
}
