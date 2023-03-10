import { format } from "date-fns";
import React, { useMemo } from "react";
import { DateRange } from "react-day-picker";
import { Booking } from "../store/slices/spaces.types";
import { selectBooking, selectSpace } from "../store/slices/spacesSlice";
import { useAppSelector } from "../store/store.hooks";
import bookingItemStyles from "../styles/bookingItem.module.scss";
import { Button } from "./button";
import { DateRangeInput } from "./dateRangeInput";
import { useBookSpace } from "./hooks/useBookSpace";

interface BookingItemProps {
  bookingId: string;
  onClose: () => void;
  spaceId: string;
  bookings: Booking[];
}

export const BookingItem = ({
  bookingId,
  spaceId,
  onClose,
  bookings,
}: BookingItemProps) => {
  const booking = useAppSelector(selectBooking(bookingId, spaceId));
  const space = useAppSelector(selectSpace(spaceId));
  const currentRange: DateRange = {
    from: booking.start_date as Date,
    to: booking.end_date as Date,
  };
  const {
    range,
    setRange,
    footer,
    disabledDays,
    errorMessage,
    onUpdateBooking,
    onDeleteBooking,
    disabled,
  } = useBookSpace({
    bookings: bookings,
    spaceId: booking.spaceId,
    bookingId: booking.id,
    defaultRange: currentRange,
  });

  const onDelete = () => {
    onDeleteBooking();
    onClose();
  };

  return (
    <div className={bookingItemStyles.bookingContainer}>
      <div>Current Booking:</div>
      <div>
        {format(booking.start_date as Date, "PP")} to{" "}
        {format(booking.end_date as Date, "PP")}
      </div>
      <DateRangeInput
        range={range}
        footer={footer}
        setRange={setRange}
        disabledDays={disabledDays}
        errorMessage={errorMessage}
        defaultMonth={currentRange.from}
      />
      <Button onClick={onUpdateBooking} disabled={disabled}>
        Update Booking
      </Button>
      <Button variant="danger" onClick={onDelete}>
        Delete Booking
      </Button>
    </div>
  );
};
