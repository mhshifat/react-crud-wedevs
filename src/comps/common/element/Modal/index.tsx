import React from "react";
import { FaTimes } from "react-icons/fa";
import "./index.css";

interface Props {
  open?: boolean;
  title: string;
  width?: string;
  onClose?: () => void;
  onSave?: () => void;
}

const Modal: React.FC<Props> = ({
  title,
  onClose,
  onSave,
  children,
  open,
  width,
}) => {
  return (
    <div
      className={`modal-backdrop ${open ? "open" : ""}`}
      onClick={(e) => onClose?.()}
    >
      <div
        className="modal-container"
        {...(width ? { style: { width } } : {})}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <span>{title}</span>
          <FaTimes onClick={() => onClose?.()} />
        </div>

        <div className="modal-body">{children}</div>

        <div className="modal-footer">
          <button className="btn-close" onClick={() => onClose?.()}>
            Close
          </button>
          <button className="btn-save" onClick={() => onSave?.()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
