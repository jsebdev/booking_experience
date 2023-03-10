import Image from "next/image";
import React from "react";
import { connect } from "react-redux";
import { Space } from "../store/slices/spaces.types";
import { addSpace } from "../store/slices/spacesSlice";
import formStyles from "../styles/form.module.scss";
import { Button } from "./button";
import { useSpaceForm } from "./hooks/useSpaceForm";

interface CreateSpaceFormProps {
  createSpace: (space: Space) => void;
  onClose: () => void;
}

export const CreateSpaceForm = connect(null, (dispatch) => ({
  createSpace: (space: Space) => {
    dispatch(addSpace({ spaceId: space.id, space }));
  },
}))(({ onClose, createSpace }: CreateSpaceFormProps) => {
  const {
    handleSave,
    handleImageChange,
    selectedImage,
    uploadingData,
    nameRef,
    descriptionRef,
    errorMessage,
  } = useSpaceForm(createSpace, onClose);

  return (
    <div className={formStyles.formContainer}>
      <form className={formStyles.form} onSubmit={handleSave}>
        <label htmlFor="space_name">
          * Space name:
          <input id="space_name" type="text" name="space_name" ref={nameRef} />
        </label>
        <label htmlFor="space_description">
          * Space description:
          <textarea
            id="space_description"
            name="space_description"
            ref={descriptionRef}
          />
        </label>
        <div className={formStyles.imageInputContainer}>
          <label htmlFor="space_image" className={formStyles.imageLabel}>
            <input
              id="space_image"
              name="space_image"
              type="file"
              hidden
              onChange={handleImageChange}
              accept=".png,.jpg,.jpeg,.webp"
            />
            <div className={formStyles.imageInput}>
              {selectedImage ? (
                <div className={formStyles.imageContainer}>
                  <Image
                    src={selectedImage}
                    alt="space"
                    fill
                    className={formStyles.image}
                  />
                </div>
              ) : (
                <div className={formStyles.imageButton}>
                  <span>Select Image</span>
                </div>
              )}
            </div>
          </label>
        </div>
        <div className={formStyles.submitContainer}>
          <Button disabled={uploadingData} type="submit">
            {uploadingData ? "Saving space..." : "Create space"}
          </Button>
        </div>
        {errorMessage && <p className="error-message">* {errorMessage}</p>}
      </form>
    </div>
  );
});
