import React, { useState } from 'react';
import { Modal } from './Modal';
import { priorityOptions, stateOptions } from '../utils/options';
import { CustomForm } from './CustomForm';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { EditModalProps } from '../types/EditModalProps.types';
export const EditModal = ({todo}: EditModalProps) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);
  return (
    <div>
      <div>
        <button className='table-button' onClick={openEditModal}><BorderColorIcon className="background-green" style={{color: 'white', width: '100%', height: '90%'}}/></button>
      </div>
      <Modal label='Edit' isOpen={isEditModalOpen} onClose={closeEditModal}>
        <CustomForm btnLabel='Edit' priorityOptions={priorityOptions.slice(1)} includeDate initialValues={todo}/>
      </Modal>
    </div>
  )
}
