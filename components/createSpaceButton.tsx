import { Button, Center } from "@mantine/core";
import React from "react";
import { CreateSpaceForm } from "./createSpaceForm";
import { Modal } from "./modal";

export const CreateSpaceButton = () => {
  const [showModal, setShowModal] = React.useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Center m="lg">
        <Button onClick={() => setShowModal(true)}>Create new Space</Button>
      </Center>
      <Modal opened={showModal} onClose={closeModal}>
        <CreateSpaceForm onClose={closeModal} />
      </Modal>
    </>
  );
};
