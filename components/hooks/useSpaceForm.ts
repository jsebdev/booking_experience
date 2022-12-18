import React from "react";
import axios from "axios";
import { Space } from "../../store/slices/spaces.types";
import { makeId } from "../../helpers/makeId";

export const useSpaceForm = (
  createSpace: (space: Space) => void,
  onClose: () => void
) => {
  const [uploadingData, setUploadingData] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState<File>();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const nameRef = React.createRef<HTMLInputElement>();
  const descriptionRef = React.createRef<HTMLTextAreaElement>();

  const handleSave: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    if (!name || !description) {
      setErrorMessage("Please enter a name and description");
      return;
    }
    setErrorMessage(null);
    setUploadingData(true);
    const space: Space = {
      id: makeId(name),
      name,
      description,
      image: selectedFile,
      bookings: {},
    };
    createSpace(space);
    setUploadingData(false);
    onClose();
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    if (target.files?.length) {
      const file = target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };
  return {
    handleSave,
    handleImageChange,
    selectedImage,
    uploadingData,
    nameRef,
    descriptionRef,
    errorMessage,
  };
};
