import { createSlice } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { RootState } from "../store";
import {
  AddBookingAction,
  AddSpaceAction,
  Booking,
  Bookings,
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
      name: "House La Maria",
      description: `This comfortable two-story house is located in a beautiful neighborhood surrounded by lush greenery and tall trees. The community is filled with friendly neighbors that make this a great place to call home. The house has a large backyard perfect for hosting summer barbecues and get-togethers. Inside, the house is spacious and inviting, making it a warm and inviting place to spend time. The neighborhood is also close to many amenities, such as shopping and dining, making it an ideal location for anyone looking for a comfortable home.\n
It is located near a lake\n
The house has a large backyard perfect for hosting summer barbecues and get-togethers. The grassy area is perfect for any outdoor activities, from running and playing to just relaxing in the sun. Inside, the house is spacious\n`,
      bookings: {
        "test-booking-1": {
          id: "test-booking-1",
          spaceId: "test-space-1",
          start_date: addDays(new Date(), 5).toString(),
          end_date: addDays(new Date(), 9).toString(),
        },
        "test-booking-2": {
          id: "test-booking-2",
          spaceId: "test-space-1",
          start_date: addDays(new Date(), 11).toString(),
          end_date: addDays(new Date(), 20).toString(),
        },
        "test-booking-3": {
          id: "test-booking-3",
          spaceId: "test-space-1",
          start_date: addDays(new Date(), 50).toString(),
          end_date: addDays(new Date(), 51).toString(),
        },
        "test-booking-4": {
          id: "test-booking-4",
          spaceId: "test-space-1",
          start_date: addDays(new Date(), 60).toString(),
          end_date: addDays(new Date(), 80).toString(),
        },
        "test-booking-5": {
          id: "test-booking-5",
          spaceId: "test-space-1",
          start_date: addDays(new Date(), 100).toString(),
          end_date: addDays(new Date(), 150).toString(),
        },
        "test-booking-6": {
          id: "test-booking-6",
          spaceId: "test-space-1",
          start_date: addDays(new Date(), 20).toString(),
          end_date: addDays(new Date(), 30).toString(),
        },
      },
      image: "/images/room1.jpeg",
      test: true,
    },
    "test-space-2": {
      id: "test-space-2",
      name: "Red beauty",
      description: `
The building is called the red beauty. It's located in a beautiful place. Many people visit this location every day to admire the sunset. The tower has many amenities that make it a great place to work or live. Many people love the look of this building and find it inspiring.\n
The building looks red in the evening since it's located by a marina. Every afternoon and evening, sunlight reflects off the lake and casts a red glow on the building's structure. In addition, the red bricks stand out even more against the blue sky. This is an interesting effect that makes the building look even more beautiful at sunset. Anyone who visits this spot at night will agree that the building is stunningly lit up.\n
The building is one of the most iconic in Hong Kong. It's so famous that even people from other countries know about it. Many have seen photos or videos online of tourists visiting Hong Kong staring up at the red beauty with wonder in their eyes. Other visitors come to Hong Kong for business or education purposes- then decide to rent an apartment within the red beauty tower complex for their stay. The building itself is beautiful, but its interior is also well-equipped for living in modern times. Many people move into this apartment complex and enjoy all its has to offer.\n
      `,
      bookings: {},
      image: "/images/building1.jpg",
      test: true,
    },
    "test-space-3": {
      id: "test-space-3",
      name: "Lovely nest",
      description: `
         Christmas is the most wonderful time of the year. It's a time to celebrate with family and friends and to give thanks for blessings from past and present. Families gather at their homes and at churches to celebrate the birth of Jesus, who is also referred to as Christ. The word 'christmas' comes from the Greek word 'chrismas,' which means 'to be consecrated.' The holiday tradition of giving gifts has its root in Jesus' gift of himself on the cross to pay for mankind's sins. The giver chooses what gifts to give and how much to give them. The receivers of these gifts - family and friends - also bring something to the table. Together, they share in each other's joys and sorrows. Over time, this joyful gathering has become one of the world's most treasured traditions.\n
 Christmas starts on November 1 in some countries and varies by region. In the United States, Christmas usually falls on December 24-26. Families gather at their homes or hotels to celebrate the holidays. They cook delicious meals to welcome guests and allow plenty of time for cooking, cleaning and shopping. Decorations grace every window and corner of homes as hosts prepare for their annual visit with loved ones. Each year, this beloved holiday brings joy to billions of people around the world.\n
We love your enthusiasm for trying to copy this text! If you're clever enough to try to copy this text, you're clever enough to know Smodin can help make your work 10 times easier! Please show your support by upgrading to a free account, you'll get access to new writing methods, super charge (our 10x larger writing model), longer writing content, and full content access. There are many other great features too, including unlimited plagiarism checks, unlimited rewrites, more credits, and access to the newest AI features Smodin has to offer!\n
        `,
      bookings: {},
      image: "/images/room2.jpeg",
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

// Actions
export const {
  addSpace,
  removeSpace,
  addSpaceBooking,
  deleteSpaceBooking,
  updateSpaceBooking,
} = counterSlice.actions;

//reducer
export const spaceReducer = counterSlice.reducer;

// selectors
export const selectSpaces = (state: RootState): Spaces =>
  spaces2WithDates(state.spaces.spaces);
export const selectSpace =
  (id: string) =>
  (state: RootState): Space =>
    space2WithDates(state.spaces.spaces[id]);
export const selectBooking =
  (bookingId: string, spaceId: string) =>
  (state: RootState): Booking =>
    booking2WithDates(state.spaces.spaces[spaceId].bookings[bookingId]);

// We always save dates as strings in the state to avoid "non-serializable" errors.
// Therefore these special functions are used to convert all string dates from bookings to Date types
// before returning them to the client since it's easier to work with Date types
const booking2WithDates = (booking: Booking): Booking => ({
  ...booking,
  start_date: new Date(booking.start_date),
  end_date: new Date(booking.end_date),
});
const space2WithDates = (space: Space): Space => ({
  ...space,
  bookings: Object.values(space.bookings).reduce<Bookings>(
    (bookings, booking) => {
      bookings[booking.id] = booking2WithDates(booking);
      return bookings;
    },
    {}
  ),
});
const spaces2WithDates = (spaces: Spaces): Spaces =>
  Object.values(spaces).reduce<Spaces>((spaces, space) => {
    spaces[space.id] = space2WithDates(space);
    return spaces;
  }, {});
