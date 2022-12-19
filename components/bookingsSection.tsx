import React, { useState } from "react";
import { format } from "date-fns";
import { Booking, Bookings } from "../store/slices/spaces.types";
import bookingSectionStyles from "../styles/bookingsSection.module.scss";
import { Modal } from "./modal";
import { BookingItem } from "./bookingItem";

interface BookingsSectionProps {
  bookings: Bookings;
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
          booking={selectedBooking as Booking}
          onClose={closeModal}
        />
      </Modal>
      <div className={bookingSectionStyles.bookingsContainer}>
        <div className={bookingSectionStyles.bookings}>
          {Object.keys(bookings).length > 0 ? (
            <>
              {Object.values(bookings)
                .sort(
                  (bA, bB) => bA.start_date.getTime() - bB.start_date.getTime()
                )
                .map((booking) => (
                  <div
                    onClick={() => selectBooking(booking)}
                    className={bookingSectionStyles.booking}
                    key={booking.id}
                  >
                    {format(booking.start_date, "PPP")} ..{" "}
                    {format(booking.end_date, "PPP")}
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
