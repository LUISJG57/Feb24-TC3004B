import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;