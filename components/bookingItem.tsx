import { format } from "date-fns";
import React from "react";
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
}

export const BookingItem = ({
  bookingId,
  spaceId,
  onClose,
}: BookingItemProps) => {
  const booking = useAppSelector(selectBooking(bookingId, spaceId));
  const space = useAppSelector(selectSpace(spaceId));
  const currentRange: DateRange = {
    from: booking.start_date,
    to: booking.end_date,
  };
  const {
    range,
    setRange,
    footer,
    disabledDays,
    errorMessage,
    onUpdateBooking,
    onDeleteBooking,
  } = useBookSpace({
    bookings: Object.values(space.bookings),
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
        {format(booking.start_date, "PPP")} to {format(booking.end_date, "PPP")}
      </div>
      <DateRangeInput
        range={range}
        footer={footer}
        setRange={setRange}
        disabledDays={disabledDays}
        errorMessage={errorMessage}
      />
      <Button onClick={onUpdateBooking}>Update Booking</Button>
      <Button variant="danger" onClick={onDelete}>
        Delete Booking
      </Button>
    </div>
  );
};
