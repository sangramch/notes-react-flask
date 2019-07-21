import React from "react"
import NotePreview from "./NotePreview.js"
import {Modal,Container,Col,Row} from "react-bootstrap"
import auth from "./auth"

export default class Notes extends React.Component{
    constructor(){
        super()
        this.state={
            error:false,
            response:[]
        }
        this.componentDidMount=this.componentDidMount.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
        this.fetchError=this.fetchError.bind(this)
        this.errorClose=this.errorClose.bind(this)
    }

    errorClose(){
        this.setState({
            error:false
        })
        window.location.reload()
    }

    fetchError(){
        this.setState({
            error:true
        })
    }


    componentDidMount(){
        fetch("http://localhost:5000/api/getnotes",
            {
                method:"POST",
                headers:{
                    'Authorization':localStorage.getItem("token"),
                    'Content-type':'application/json',
                    'Accept':'application/json'
                }
            }
        )

        .then(res=>{
            if(res.status>=200 && res.status<=300){
            res.json().then(res=>(
                this.setState({
                    response:res
                })
            ))}
            
            else if(res.status===401){
                auth.logout()
            }
        })

        .catch(err=>{
            console.log("in notes")
            console.log(err)
            this.fetchError()
        })

    }

    handleDelete(id){

        this.setState(prevState=>{
            let newstate=[...prevState.response]
            for(let i=0;i<newstate.length;i++){
                if(newstate[i].id===id){
                    newstate.splice(i,1)
                    break
                }
            }
            return {
                response:newstate
            }
        })
        console.log(this.state.response)

    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        {this.state.response.map(
                            note=>(
                                <Col className="noteprev" lg={3} md={5} sm={12} key={note.id} style={{"marginLeft":"30px","marginRight":"30px"}}>
                                    <NotePreview logoutCallback={this.props.logoutCallback} key={note.id} id={note.id} title={note.title} note={note.note} onDelete={this.handleDelete}/>
                                </Col>)
                            )
                        }
                    </Row>
                </Container>
                <Modal show={this.state.error} onHide={this.errorClose}>
                    <Modal.Body>Failed to Fetch Data. Please Check your Connection and Reload.</Modal.Body>
                </Modal>
            </div>
        )
    }
}