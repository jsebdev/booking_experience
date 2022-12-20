import { sortBookings } from "./../../helpers/utils";
import { addDays, format, subDays } from "date-fns";
import { MouseEventHandler, useEffect, useState } from "react";
import { DateRange, Matcher } from "react-day-picker";
import { Booking } from "../../store/slices/spaces.types";
import {
  BookingOverlapping,
  useBookSpaceOptions,
  useBookSpaceReturn,
} from "./useBookSpace.types";
import {
  addSpaceBooking,
  deleteSpaceBooking,
  updateSpaceBooking,
} from "../../store/slices/spacesSlice";
import { makeId } from "../../helpers/makeId";
import { useAppDispatch } from "../../store/store.hooks";

/**
 * useBookSpace provides all logic for creating and updating bookings
 * @param options - object containing booking options
 * @returns object containing the following properties:
 * - range: selected range of Dates
 * - setRange: function to update the selected range
 * - footer: message to display at the bottom of the date selector
 * - disabledDays: Array of dates ranges that should be disabled
 * - errorMessage: Error message to display at the bottom of the date selector
 * - onCreateBooking: function to create a new booking
 * - onUpdateBooking: function to update an existing booking
 * - disabled: boolean to determine if button is to update is disabled or not
 */
export const useBookSpace = ({
  bookings,
  spaceId,
  defaultRange,
  bookingId,
}: useBookSpaceOptions): useBookSpaceReturn => {
  const dispatch = useAppDispatch();
  const [range, setRange] = useState<DateRange | undefined>(defaultRange);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [disabledDays, setDisabledDays] = useState<Matcher[]>([]);

  let footer = "Please pick the first day.";
  if (range?.from) {
    if (!range.to) {
      footer = format(range.from, "PP");
    } else if (range.to) {
      footer = `${format(range.from, "PP")}–${format(range.to, "PP")}`;
    }
  }

  useEffect(() => {
    let nextRangeShifted = false;
    const days: Matcher[] = sortBookings(bookings)
      .filter((booking) => booking.id !== bookingId)
      .map((booking) => {
        let startRange: number = 0;
        if (
          !nextRangeShifted &&
          range?.from?.getTime() &&
          (booking.start_date as Date).getTime() > range?.from?.getTime()
        ) {
          nextRangeShifted = true;
          startRange = 1;
        }
        const from = addDays(booking.start_date as Date, startRange);
        const to = subDays(booking.end_date as Date, 1);

        if (from.getTime() > to.getTime()) return { from: from, to: from };

        return { from, to };
      });
    days.push({ before: new Date() });
    if (days !== disabledDays) setDisabledDays(days);
  }, [range, bookings]);

  const checkErrors = (): boolean => {
    if (!range?.from || !range?.to) {
      setErrorMessage("Please select a date range.");
      return true;
    }
    if (range.from.getDate() === range.to.getDate()) {
      setErrorMessage(
        "Please select different dates for the beginning and end of your booking."
      );
      return true;
    }
    const overlapping = overLappingBookings(range, bookings, bookingId);
    if (overlapping.overlapping) {
      setErrorMessage(
        `This dates overlaps the booking between ${format(
          overlapping.overlappingBooking!.start_date as Date,
          "PP"
        )} and ${format(
          overlapping.overlappingBooking!.end_date as Date,
          "PP"
        )}`
      );
      return true;
    }
    setErrorMessage(null);
    return false;
  };

  const makeBooking = (newBooking: boolean): Booking => ({
    spaceId,
    id: newBooking ? makeId(`${new Date().getTime()}`) : (bookingId as string),
    start_date: range?.from?.toString() as string,
    end_date: range?.to?.toString() as string,
  });

  const onCreateBooking: MouseEventHandler<HTMLButtonElement> = () => {
    if (checkErrors()) return;
    const booking: Booking = makeBooking(true);
    dispatch(addSpaceBooking(booking));
    setRange(undefined);
  };

  const onUpdateBooking: MouseEventHandler<HTMLButtonElement> = () => {
    if (checkErrors()) return;
    const booking: Booking = makeBooking(false);
    dispatch(updateSpaceBooking(booking));
  };

  const onDeleteBooking = () => {
    dispatch(
      deleteSpaceBooking({
        spaceId: spaceId,
        bookingId: bookingId as string,
      })
    );
  };

  const disabled = defaultRange === range || !range?.from || !range?.to;

  return {
    range,
    setRange,
    footer,
    disabledDays,
    errorMessage,
    onCreateBooking,
    onUpdateBooking,
    onDeleteBooking,
    disabled,
  };
};

const overLappingBookings = (
  range: DateRange,
  bookings: Booking[],
  currentBookingId?: string
): BookingOverlapping => {
  for (let booking of bookings.filter(
    (booking) => booking.id !== currentBookingId
  )) {
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
