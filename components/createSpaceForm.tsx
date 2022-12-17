import React from "react";
import formStyles from "../styles/form.module.scss";
import axios from "axios";
import { debug } from "util";

export const CreateSpaceForm = () => {
  const [uploadingData, setUploadingData] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState<File>();

  // const imageInputRef = React.createRef<HTMLInputElement>();

  const handleSave: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setUploadingData(true);
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const { data } = await axios.post("/api/space", formData);
        console.log(data);
      } catch (error: any) {
        console.log(error.response?.data);
      }
    } else {
      console.log("No image selected");
    }
    setUploadingData(false);
  };

  // const handleImageChoose = () => {
  //   console.log("se hizo click");
  //   debugger;
  //   imageInputRef.current?.click();
  // };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    debugger;
    if (target.files?.length) {
      const file = target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  return (
    <div className={formStyles.formContainer}>
      <form className={formStyles.form} onSubmit={handleSave}>
        <label htmlFor="space_name">
          Space name:
          <input id="space_name" type="text" name="space_name" />
        </label>
        <label htmlFor="space_description">
          Space description:
          <textarea id="space_description" name="space_description" />
        </label>
        <div className={formStyles.imageInputContainer}>
          <label htmlFor="space_image">
            <input
              id="space_image"
              name="space_image"
              // ref={imageInputRef}
              type="file"
              hidden
              onChange={handleImageChange}
              accept=".png,.jpg,.jpeg"
            />
            {/* <div onClick={handleImageChoose} className={formStyles.imageInput}> */}
            <div className={formStyles.imageInput}>
              {selectedImage ? (
                <div className={formStyles.imageContainer}>
                  <img src={selectedImage} alt="space" />
                </div>
              ) : (
                <div className={formStyles.imageButton}>
                  <span>Select Image</span>
                </div>
              )}
            </div>
          </label>
        </div>
        <input
          disabled={uploadingData}
          type="submit"
          value={uploadingData ? "Saving space..." : "Create space"}
        />
      </form>
    </div>
  );
};
