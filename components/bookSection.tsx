import React from "react";
import { DayPicker, ClassNames } from "react-day-picker";
import dayPickerStyles from "react-day-picker/dist/style.module.css";
import { Bookings } from "../store/slices/spaces.types";
import bookSectionStyles from "../styles/bookSection.module.scss";
import { Button } from "./button";
import { useBookSpace } from "./hooks/useBookSpace";

interface BookSectionProps {
  bookings: Bookings;
  spaceId: string;
}

const BookSection = ({ bookings, spaceId }: BookSectionProps) => {
  const dayPickerClassName: ClassNames = {
    ...dayPickerStyles,
  };
  const {
    range,
    footer,
    setRange,
    disabledDays,
    errorMessage,
    onCreateBooking,
  } = useBookSpace({ bookings: Object.values(bookings), spaceId });
  return (
    <div className={bookSectionStyles.bookSection}>
      <DayPicker
        classNames={dayPickerClassName}
        mode="range"
        selected={range}
        footer={footer}
        onSelect={setRange}
        disabled={disabledDays}
        // numberOfMonths={2}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className={bookSectionStyles.buttonContainer}>
        <Button onClick={onCreateBooking}>Create new Booking</Button>
      </div>
    </div>
  );
};

export default BookSection;
