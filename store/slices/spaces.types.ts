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
  bookings: {
    [bookingId: string]: Booking;
  };
}

export interface Booking {
  spaceId: string;
  id: string;
  name: string;
  start_date: Date;
  end_date: Date;
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