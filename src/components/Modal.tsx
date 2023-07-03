import React from 'react'

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  width?: string;
}

const Modal: React.FC<Props> = ({ children, onClose, title = '', width = '500px' }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
    <div className="relative mx-auto" style={{ width }}>
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button className="btn btn-secondary" onClick={onClose}>
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  </div>
)

export default Modal
