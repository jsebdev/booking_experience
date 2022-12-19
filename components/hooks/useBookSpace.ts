import { format } from "date-fns";
import { MouseEventHandler, useState } from "react";
import { DateRange } from "react-day-picker";
import { Booking } from "../../store/slices/spaces.types";
import { BookingOverlapping, useBookSpaceOptions } from "./useBookSpace.types";
import { addSpaceBooking } from "../../store/slices/spacesSlice";
import { makeId } from "../../helpers/makeId";
import { useAppDispatch } from "../../store/store.hooks";

export const useBookSpace = ({ bookings, spaceId }: useBookSpaceOptions) => {
  const dispatch = useAppDispatch();
  const [range, setRange] = useState<DateRange | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  let footer = "Please pick the first day.";
  if (range?.from) {
    if (!range.to) {
      footer = format(range.from, "PPP");
    } else if (range.to) {
      footer = `${format(range.from, "PPP")}–${format(range.to, "PPP")}`;
    }
  }
  const disabledDays = bookings.map((booking) => ({
    from: booking.start_date,
    to: booking.end_date,
  }));
  const onCreateBooking: MouseEventHandler<HTMLButtonElement> = () => {
    if (!range?.from || !range?.to) {
      setErrorMessage("Please select a date range.");
      return;
    }
    const overlapping = overLappingBookings(range, bookings);
    if (overlapping.overlapping) {
      setErrorMessage(
        `This dates overlaps the booking between ${format(
          overlapping.overlappingBooking!.start_date,
          "PPP"
        )} and ${format(overlapping.overlappingBooking!.end_date, "PPP")}`
      );
      return;
    }
    setErrorMessage(null);
    const booking: Booking = {
      spaceId,
      id: makeId(`${new Date().getTime()}`),
      start_date: range.from,
      end_date: range.to,
    };
    dispatch(addSpaceBooking(booking));
    setRange(undefined);
  };
  return {
    range,
    setRange,
    footer,
    disabledDays,
    errorMessage,
    onCreateBooking,
  };
};

const overLappingBookings = (
  range: DateRange,
  bookings: Booking[]
): BookingOverlapping => {
  for (let booking of bookings) {
    if (
      (booking.start_date >= (range.from as Date) &&
        booking.start_date < (range.to as Date)) ||
      ((range.from as Date) >= booking.start_date &&
        (range.to as Date) < booking.end_date)
    ) {
      return { overlapping: true, overlappingBooking: booking };
    }
  }
  return { overlapping: false };
};
