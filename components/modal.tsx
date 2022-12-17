import React, { useRef } from "react";
import modalStyles from "../styles/modal.module.scss";
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ opened, onClose, children }: ModalProps) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const closeOnParent: React.MouseEventHandler = (event) => {
    if (layerRef.current == event.target) onClose();
  };
  if (!opened) return null;
  return (
    <div
      className={modalStyles.modalContainer}
      onClick={closeOnParent}
      ref={layerRef}
    >
      <div className={modalStyles.modal}>
        <RxCross2 className={modalStyles.closeIcon} onClick={onClose} />
        {children}
      </div>
    </div>
  );
};
