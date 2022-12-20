import React, { useState } from "react";
import { format } from "date-fns";
import { Booking, Bookings } from "../store/slices/spaces.types";
import bookingSectionStyles from "../styles/bookingsSection.module.scss";
import { Modal } from "./modal";
import { BookingItem } from "./bookingItem";

interface BookingsSectionProps {
  bookings: Booking[];
}

export const BookingsSection = ({ bookings }: BookingsSectionProps) => {
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const selectBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };
  const closeModal = () => {
    setShowBookingModal(false);
  };
  return (
    <>
      <Modal opened={showBookingModal} onClose={closeModal}>
        <BookingItem
          bookingId={selectedBooking?.id as string}
          onClose={closeModal}
          spaceId={selectedBooking?.spaceId as string}
        />
      </Modal>
      <div className={bookingSectionStyles.bookingsContainer}>
        <div className={bookingSectionStyles.bookings}>
          {bookings.length > 0 ? (
            <>
              {bookings
                .sort(
                  (bA, bB) =>
                    (bA.start_date as Date).getTime() -
                    (bB.start_date as Date).getTime()
                )
                .map((booking) => (
                  <div
                    onClick={() => selectBooking(booking)}
                    className={bookingSectionStyles.booking}
                    key={booking.id}
                  >
                    {format(booking.start_date as Date, "PP")} ..{" "}
                    {format(booking.end_date as Date, "PP")}
                  </div>
                ))}
            </>
          ) : (
            <div className={bookingSectionStyles.noBooking}>
              No bookings yet for this space
            </div>
          )}
        </div>
      </div>
    </>
  );
};
