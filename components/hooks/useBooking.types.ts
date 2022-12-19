import { Booking } from "../../store/slices/spaces.types";
import { AppDispatch } from "../../store/store";

export interface BookingOverlapping {
  overlapping: boolean;
  overlappingBooking?: Booking;
}

export interface useBookingOptions {
  bookings: Booking[];
  dispatch: AppDispatch;
  spaceId: string;
}
