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
  // const imageInputRef = React.createRef<HTMLInputElement>();
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
    let uploadedImage: null | string = null;
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const { data } = await axios.post("/api/space", formData);
        console.log(data);
        uploadedImage = data.data.files.image.newFilename;
      } catch (error: any) {
        console.log(error.response?.data);
      }
    } else {
      console.log("No image selected");
    }
    const space: Space = {
      id: makeId(name),
      name,
      description,
      image: uploadedImage,
      bookings: {},
    };
    createSpace(space);
    setUploadingData(false);
    onClose();
  };

  // const handleImageChoose = () => {
  //   console.log("se hizo click");
  //   debugger;
  //   imageInputRef.current?.click();
  // };

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
