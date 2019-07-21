import React from 'react'
import {Modal,Button} from 'react-bootstrap'

export default class DeleteConfirmaton extends React.Component{
    render(){
        return(
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Body>Are you sure you want to delete the note?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.confirmDelete}>Yes</Button>
                    <Button variant="warning" onClick={this.props.onHide}>No</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}