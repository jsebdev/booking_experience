import { Booking } from "../store/slices/spaces.types";

export const imageSrc = (
  image: File | string | undefined | null,
  test: boolean | undefined
) => {
  if (typeof image === "string") {
    return `${image}`;
  }
  if (typeof image === "object") {
    return URL.createObjectURL(image as unknown as File);
  }
  return "/images/no-image.png";
};

export const sortBookings = (bookings: Booking[]): Booking[] =>
  bookings.sort(
    (bA, bB) =>
      (bA.start_date as Date).getTime() - (bB.start_date as Date).getTime()
  );
