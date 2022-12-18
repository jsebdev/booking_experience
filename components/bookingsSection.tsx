import React from "react";
import { format } from "date-fns";
import { Bookings } from "../store/slices/spaces.types";
import bookingSectionStyles from "../styles/bookingsSection.module.scss";

interface BookingsSectionProps {
  bookings: Bookings;
}

export const BookingsSection = ({ bookings }: BookingsSectionProps) => {
  return (
    <div className={bookingSectionStyles.bookings}>
      {Object.keys(bookings).length > 0 ? (
        <>
          {Object.values(bookings)
            .sort((bA, bB) => bA.start_date.getTime() - bB.start_date.getTime())
            .map((booking) => (
              <div className={bookingSectionStyles.booking} key={booking.id}>
                {format(booking.start_date, "yyyy/MM/dd")} ..{" "}
                {format(booking.end_date, "yyyy/MM/dd")}
              </div>
            ))}
        </>
      ) : (
        <div className={bookingSectionStyles.noBooking}>
          No bookings yet for this space
        </div>
      )}
    </div>
  );
};
