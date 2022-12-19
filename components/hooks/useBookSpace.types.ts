import { MouseEventHandler } from "react";
import { DateRange, Matcher, SelectRangeEventHandler } from "react-day-picker";
import { Booking } from "../../store/slices/spaces.types";

export interface BookingOverlapping {
  overlapping: boolean;
  overlappingBooking?: Booking;
}

export interface useBookSpaceOptions {
  bookings: Booking[];
  spaceId: string;
  defaultRange?: DateRange;
  bookingId?: string;
}

export interface useBookSpaceReturn {
  range: DateRange | undefined;
  setRange: SelectRangeEventHandler;
  footer: string;
  disabledDays: Matcher[];
  errorMessage: string | null;
  onCreateBooking: MouseEventHandler<HTMLButtonElement>;
  onUpdateBooking: MouseEventHandler<HTMLButtonElement>;
  onDeleteBooking: () => void;
  disabled: boolean;
}
