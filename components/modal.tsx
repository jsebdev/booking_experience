import React, { useEffect, useRef } from "react";
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
  useEffect(() => {
    if (opened) {
      const topY = `-${window.scrollY}px`;
      document.body.style.position = "fixed";
      document.body.style.top = topY;
      document.body.style.width = "100vw";
      return;
    }
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }, [opened]);

  if (!opened) return null;
  return (
    <div>
      <div className={modalStyles.modalBackLayer}>
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
      </div>
    </div>
  );
};
