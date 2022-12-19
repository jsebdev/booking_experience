import { format } from "date-fns";
import React from "react";
import { Booking } from "../store/slices/spaces.types";
import { deleteSpaceBooking } from "../store/slices/spacesSlice";
import { useAppDispatch } from "../store/store.hooks";
import bookingItemStyles from "../styles/bookingItem.module.scss";
import { Button } from "./button";

interface BookingItemProps {
  booking: Booking;
  onClose: () => void;
}

export const BookingItem = ({ booking, onClose }: BookingItemProps) => {
  const dispatch = useAppDispatch();

  const onDelete = () => {
    dispatch(
      deleteSpaceBooking({
        spaceId: booking.spaceId,
        bookingId: booking.id,
      })
    );
    onClose();
  };

  return (
    <div className={bookingItemStyles.bookingContainer}>
      {booking.id}
      <div className={bookingItemStyles.date}>
        {format(booking.start_date, "PPP")}
      </div>
      <div className={bookingItemStyles.to}>to</div>
      <div className={bookingItemStyles.date}>
        {format(booking.end_date, "PPP")}
      </div>
      <Button variant="danger" onClick={onDelete}>
        Delete Booking
      </Button>
    </div>
  );
};
