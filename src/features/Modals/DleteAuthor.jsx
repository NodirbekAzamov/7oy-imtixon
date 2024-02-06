import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import AxiosClent from '../../plugins/AxiosClent'

export default function DleteAuthor({ open, toggle, id }) {
    const deleteJanr = () => {
        AxiosClent.delete(`/author/${id}`).then((res) => {
            if (res.status === 200) {
                window.location.reload()
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Modal isOpen={open} toggle={toggle}>
            <ModalHeader>
                <h2>Are you sure you want to delete it?</h2>
            </ModalHeader>
            <ModalBody>
                <button onClick={toggle} className='bg-[#3ca1ff] mx-[5px] text-[#fff] rounded-[10px] py-[8px] px-[15px]'>No</button>
                <button onClick={deleteJanr} className='bg-[#ff2d2d]  text-[#fff]  rounded-[10px] py-[8px] px-[15px]'>Yes</button>
            </ModalBody>
        </Modal>
    )
}
