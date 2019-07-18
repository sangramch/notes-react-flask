import React from "react"
import NotePreview from "./NotePreview.js"
import {Container,Col,Row} from "react-bootstrap"

export default class Notes extends React.Component{
    constructor(){
        super()
        this.state={
            response:[]
        }
        this.componentDidMount=this.componentDidMount.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
    }


    componentDidMount(){

        fetch("http://localhost:5000/api/getnotes",
            {
            method:"POST",
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(this.state)
            }
        )

        .then(res=>res.json())
        
        .then(res=>(
        this.setState({
        response:res
        })
        ))

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
                                <Col className="noteprev" lg={3} md={5} sm={12} key={note.id} style={{"margin-left":"30px","margin-right":"30px"}}>
                                    <NotePreview key={note.id} id={note.id} title={note.title} note={note.note} onDelete={this.handleDelete}/>
                                </Col>)
                            )
                        }
                    </Row>
                </Container>
            </div>
        )
    }
}