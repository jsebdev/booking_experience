import React from "react";
import { connect } from "react-redux";
import { Space } from "../store/slices/spaces.types";
import { addSpace } from "../store/slices/spacesSlice";
import formStyles from "../styles/form.module.scss";
import { useSpaceForm } from "./hooks/useSpaceForm";

export const CreateSpaceForm = connect(null, (dispatch) => ({
  createSpace: (space: Space) =>
    dispatch(addSpace({ spaceId: space.id, space })),
}))(({ createSpace }) => {
  const {
    handleSave,
    handleImageChange,
    selectedImage,
    uploadingData,
    nameRef,
    descriptionRef,
    errorMessage,
  } = useSpaceForm(createSpace);

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
        <div className={formStyles.submitContainer}>
          <input
            disabled={uploadingData}
            type="submit"
            value={uploadingData ? "Saving space..." : "Create space"}
            className={formStyles.button}
          />
        </div>
        {errorMessage && (
          <p className={formStyles.errorMessage}>* {errorMessage}</p>
        )}
      </form>
    </div>
  );
});
