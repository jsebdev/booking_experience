import React from "react";
import spaceDetailsStyles from "../styles/spaceDetails.module.scss";
import { Button } from "./button";

const BookSection = () => {
  return (
    <div className={spaceDetailsStyles.buttonContainer}>
      <Button>Create new Booking</Button>
    </div>
  );
};

export default BookSection;
