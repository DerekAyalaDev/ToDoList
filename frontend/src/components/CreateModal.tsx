import React, { useState } from 'react';
import { Modal } from './Modal';
import { priorityOptions, stateOptions } from '../utils/options';
import { CustomForm } from './CustomForm';

export const CreateModal = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);
  return (
    <div className='container-item'>
      <div>
        <button onClick={openCreateModal} className='form-btn background-green'>Create</button>
      </div>
      <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal}>
        <CustomForm btnLabel='Create' priorityOptions={priorityOptions.slice(1)} stateOptions={stateOptions.slice(1)} includeDate />
      </Modal>
    </div>
  )
}