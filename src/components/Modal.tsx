import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai'; // Import the info icon
import './Modal.css';

const ModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modal-wrapper">
      <button className="open-modal-button" onClick={openModal}>
        <AiOutlineInfoCircle size={24} /> {/* Use the info icon */}
      </button>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content animate-modal" onClick={(e) => e.stopPropagation()}>
            <p>Sayfadaki elementlerin yerleri değiştirilebilir.</p>
            <button className="close-modal-button" onClick={closeModal}>
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;
