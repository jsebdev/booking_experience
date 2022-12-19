export interface SpaceState {
  spaces: Spaces;
}

export interface Spaces {
  [spaceId: string]: Space;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  image?: string | File | null;
  bookings: Bookings;
  test?: boolean;
}

export interface Bookings {
  [bookingId: string]: Booking;
}

export interface Booking {
  spaceId: string;
  id: string;
  start_date: string | Date;
  end_date: string | Date;
}

// action interfaces
export interface AddSpaceAction {
  payload: { spaceId: string; space: Space };
}
export interface RemoveSpaceAction {
  payload: { spaceId: string };
}
export interface AddBookingAction {
  payload: Booking;
}
export interface DeleteBookingAction {
  payload: { spaceId: string; bookingId: string };
}
export interface UpdateBookingAction {
  payload: Booking;
}
