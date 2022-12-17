import React from "react";
import formStyles from "../styles/form.module.scss";

export const CreateSpaceForm = () => {
  return (
    <div className={formStyles.formContainer}>
      <form className={formStyles.form} action="">
        <label htmlFor="space_name">Space name:</label>
        <input id="space_name" type="text" name="space_name" />
        <label htmlFor="space_description">Space description:</label>
        <textarea id="space_description" name="space_description" />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};
