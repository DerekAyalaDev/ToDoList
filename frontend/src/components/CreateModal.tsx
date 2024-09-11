import React, { useState } from 'react';
import { ToDoForm } from './ToDoForm';
import { Modal } from './Modal';

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
        <ToDoForm />
      </Modal>
    </div>
  )
}