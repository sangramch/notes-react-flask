import React from "react"
import {Button} from 'react-bootstrap'
import NoteContainer from "./NoteContainer.js"
import NoteEdit from "./NoteEdit.js"
import Logo from './icons/view.png'


let svgicons={
    view:`M244.425,98.725c-93.4,0-178.1,51.1-240.6,134.1c-5.1,6.8-5.1,16.3,0,23.1c62.5,83.1,147.2,134.2,240.6,134.2
    s178.1-51.1,240.6-134.1c5.1-6.8,5.1-16.3,0-23.1C422.525,149.825,337.825,98.725,244.425,98.725z M251.125,347.025
    c-62,3.9-113.2-47.2-109.3-109.3c3.2-51.2,44.7-92.7,95.9-95.9c62-3.9,113.2,47.2,109.3,109.3
    C343.725,302.225,302.225,343.725,251.125,347.025z M248.025,299.625c-33.4,2.1-61-25.4-58.8-58.8c1.7-27.6,24.1-49.9,51.7-51.7
    c33.4-2.1,61,25.4,58.8,58.8C297.925,275.625,275.525,297.925,248.025,299.625z`,
    
    edit:`M149.996,0C67.157,0,0.001,67.161,0.001,149.997S67.157,300,149.996,300s150.003-67.163,150.003-150.003
    S232.835,0,149.996,0z M221.302,107.945l-14.247,14.247l-29.001-28.999l-11.002,11.002l29.001,29.001l-71.132,71.126
    l-28.999-28.996L84.92,186.328l28.999,28.999l-7.088,7.088l-0.135-0.135c-0.786,1.294-2.064,2.238-3.582,2.575l-27.043,6.03
    c-0.405,0.091-0.817,0.135-1.224,0.135c-1.476,0-2.91-0.581-3.973-1.647c-1.364-1.359-1.932-3.322-1.512-5.203l6.027-27.035
    c0.34-1.517,1.286-2.798,2.578-3.582l-0.137-0.137L192.3,78.941c1.678-1.675,4.404-1.675,6.082,0.005l22.922,22.917
    C222.982,103.541,222.982,106.267,221.302,107.945z`,

    delete:{
        comp1:`M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316
        H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293
        c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329
        c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355
        c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356
        c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z`,

        comp2:`M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916
        c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z`
    }
}

export default class NotePreview extends React.Component{

    constructor(){
        super()
        this.state={
            viewmodal:false,
            editmodal:false
        }
        this.handleClick=this.handleClick.bind(this)
        this.viewViewModal=this.viewViewModal.bind(this)
        this.hideViewModal=this.hideViewModal.bind(this)
        this.viewEditModal=this.viewEditModal.bind(this)
        this.hideEditModal=this.hideEditModal.bind(this)
    }

    handleClick(){
        fetch("http://localhost:5000/api/deletenote",
            {
                method: "POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    "id":this.props.id
                })
            }
        )
        this.props.onDelete(this.props.id)
    }

    viewViewModal(){
        this.setState({
            viewmodal:true
        })
    }

    viewEditModal(){
        this.setState({
            editmodal:true,
            viewmodal:false
        })
    }

    hideViewModal(){
        this.setState({
            viewmodal:false
        })
    }

    hideEditModal(){
        this.setState({
            editmodal:false
        })
        this.hideViewModal()
    }

    render(){

        let title_preview_len=10
        let note_preview_len=15

        let ttdot=""
        let ntdot=""
        if (this.props.title.length>title_preview_len){
            ttdot="..."
        }

        if (this.props.note.length>note_preview_len){
            ntdot="..."
        }
        return (
        <div>
            <div id="notepreviewcontainer" onClick={this.viewViewModal}>
                <p style={{"font-size":"15px","float":"right"}}>{this.props.id}</p>
                <h3 style={{"font-family":"monospace"}}>{this.props.title.slice(0,title_preview_len)+ttdot}</h3>
                <p style={{"font-family":"monospace"}}>{this.props.note.slice(0,note_preview_len)+ntdot}</p>
                <Button variant="outline-success" className="viewbtn" onClick={this.viewViewModal} style={{"padding-top":0,"padding-bottom":"5px"}}>
                    <svg height="32px" width="32px" viewBox="0 0 488.85 488.85" id="viewsvg">
                        <path d={svgicons.view}/>
                    </svg>
                </Button>
                <Button variant="outline-warning" className="editbtn" onClick={this.viewEditModal} style={{"padding-top":0,"padding-bottom":"5px","z-index":1}}>
                    <svg height="32px" width="32px" viewBox="0 0 300 300" id="editsvg">
                        <path d={svgicons.edit}/>
                    </svg>
                </Button>
                <Button variant="outline-danger" className="deletebtn" onClick={this.handleClick} style={{"padding-top":0,"padding-bottom":"5px"}}>
                    <svg height="32px" width="32px" viewBox="0 0 408.483 408.483" id="deletesvg">
                        <path d={svgicons.delete.comp1}/>
                        <path d={svgicons.delete.comp2}/>
                    </svg>
                </Button>
            </div>
            <NoteContainer show={this.state.viewmodal} onHide={this.hideViewModal} id={this.props.id} title={this.props.title} note={this.props.note}></NoteContainer>
            <NoteEdit show={this.state.editmodal} onHide={this.hideEditModal} id={this.props.id} title={this.props.title} note={this.props.note}></NoteEdit>
        </div>)
    }
}