import React from "react";
import { Button, Modal } from "react-bootstrap";
const ModalDelete = props => {
    let { show, handleClose, confirmDeleteUser, dataModalDelete } = props;
    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        😢 Are you sure you want to delete user:
                        <b> {dataModalDelete.username}</b> ?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="outline-primary"
                        onClick={confirmDeleteUser}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDelete;
