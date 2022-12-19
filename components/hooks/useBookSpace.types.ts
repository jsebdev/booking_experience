import { Booking } from "../../store/slices/spaces.types";

export interface BookingOverlapping {
  overlapping: boolean;
  overlappingBooking?: Booking;
}

export interface useBookSpaceOptions {
  bookings: Booking[];
  spaceId: string;
}
