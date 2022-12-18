import React from "react";
import { Button } from "./button";
import { CreateSpaceForm } from "./createSpaceForm";
import { Modal } from "./modal";

export const CreateSpaceButton = () => {
  const [showModal, setShowModal] = React.useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Create new Space</Button>
      <Modal opened={showModal} onClose={closeModal}>
        <CreateSpaceForm onClose={closeModal} />
      </Modal>
    </>
  );
};
