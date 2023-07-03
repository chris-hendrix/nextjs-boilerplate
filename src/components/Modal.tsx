import React from 'react'

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  width?: string;
}

const Modal: React.FC<Props> = ({ children, onClose, title = '' }) => (
  <div className="modal modal-open">
    <div className="modal-box">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
      <h3 className="font-bold text-lg">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  </div>
)

export default Modal
