import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  AddBookingAction,
  AddSpaceAction,
  DeleteBookingAction,
  RemoveSpaceAction,
  Space,
  Spaces,
  SpaceState,
  UpdateBookingAction,
} from "./spaces.types";

const initialState: SpaceState = {
  spaces: {
    "test-space-1": {
      id: "test-space-1",
      name: "Test Space 1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      bookings: {},
      image: "images/room1.jpeg",
      test: true,
    },
    "test-space-2": {
      id: "test-space-2",
      name: "Test Space 2",
      description: "Test Space 2 description hola.\n adios",
      bookings: {},
      image: "images/building1.jpg",
      test: true,
    },
    "test-space-3": {
      id: "test-space-3",
      name: "Test Space 2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      bookings: {},
      image: "images/room2.jpeg",
      test: true,
    },
  },
};

export const counterSlice = createSlice({
  name: "spaces",
  initialState,
  reducers: {
    addSpace: (state, action: AddSpaceAction) => {
      state.spaces[action.payload.spaceId] = action.payload.space;
    },
    removeSpace: (state, action: RemoveSpaceAction) => {
      delete state.spaces[action.payload.spaceId];
    },
    addSpaceBooking: (state, action: AddBookingAction) => {
      state.spaces[action.payload.spaceId].bookings[action.payload.id] =
        action.payload;
    },
    deleteSpaceBooking: (state, action: DeleteBookingAction) => {
      delete state.spaces[action.payload.spaceId].bookings[
        action.payload.bookingId
      ];
    },
    updateSpaceBooking: (state, action: UpdateBookingAction) => {
      state.spaces[action.payload.spaceId].bookings[action.payload.id] =
        action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSpace,
  removeSpace,
  addSpaceBooking,
  deleteSpaceBooking,
  updateSpaceBooking,
} = counterSlice.actions;

export const selectSpaces = (state: RootState): Spaces => state.spaces.spaces;
export const selectSpace = (state: RootState, id: string): Space =>
  state.spaces.spaces[id];

export const spaceReducer = counterSlice.reducer;
