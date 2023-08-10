import React from 'react'

interface Props {
  children: React.ReactNode;
  setOpen: (open: boolean) => void;
  title?: string;
  width?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<Props> = ({ children, setOpen, title = '', size = 'sm' }) => (
  <div className="modal modal-open">
    <div className={`modal-box max-w-screen-${size}`}>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setOpen(false)}>✕</button>
      <h3 className="font-bold text-lg text-gray-500">{title}</h3>
      <div className="mt-4 text-gray-500">{children}</div>
    </div>
  </div>
)

export default Modal
