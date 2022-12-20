import React from "react";
import { Booking, Bookings } from "../store/slices/spaces.types";
import bookSectionStyles from "../styles/bookSection.module.scss";
import { Button } from "./button";
import { DateRangeInput } from "./dateRangeInput";
import { useBookSpace } from "./hooks/useBookSpace";

interface BookSectionProps {
  bookings: Booking[];
  spaceId: string;
}

const BookSection = ({ bookings, spaceId }: BookSectionProps) => {
  const {
    range,
    footer,
    setRange,
    disabledDays,
    errorMessage,
    onCreateBooking,
  } = useBookSpace({ bookings, spaceId });
  return (
    <div className={bookSectionStyles.bookSection}>
      <DateRangeInput
        range={range}
        footer={footer}
        setRange={setRange}
        disabledDays={disabledDays}
        errorMessage={errorMessage}
      />
      <div className={bookSectionStyles.buttonContainer}>
        <Button onClick={onCreateBooking}>Create new Booking</Button>
      </div>
    </div>
  );
};

export default BookSection;
