import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { Amenity } from "./interfaces/amenity.tsx";
import { Reservation } from "./interfaces/reservation.tsx";
import { Room } from "./interfaces/room.tsx";

// Amenities initial state
const initialAmenitiesState: Amenity[] = [];

// Define action types
interface AddAmenityAction extends Action<'ADD_AMENITY'> {
    payload: Amenity;
}

interface RemoveAmenityAction extends Action<'REMOVE_AMENITY'> {
    payload: { id: number };
}

interface UpdateAmenityAction extends Action<'UPDATE_AMENITY'> {
    payload: Amenity;
}

type AmenityAction = AddAmenityAction | RemoveAmenityAction | UpdateAmenityAction;

// Amenities reducer
const amenitiesReducer = (state = initialAmenitiesState, action: AmenityAction | Action): Amenity[] => {
    switch (action.type) {
        case 'ADD_AMENITY':
            return [...state, (action as AddAmenityAction).payload];
        case 'REMOVE_AMENITY':
            return state.filter(amenity => amenity.id !== (action as RemoveAmenityAction).payload.id);
        case 'UPDATE_AMENITY':
            return state.map(amenity =>
                amenity.id === (action as UpdateAmenityAction).payload.id ? { ...amenity, ...(action as UpdateAmenityAction).payload } : amenity
            );
        default:
            return state;
    }
};

// Reservations initial state
const initialReservationsState: Reservation[] = [];

// Define action types
interface AddReservationAction extends Action<'ADD_RESERVATION'> {
    payload: Reservation;
}

interface RemoveReservationAction extends Action<'REMOVE_RESERVATION'> {
    payload: { id: number };
}

interface UpdateReservationAction extends Action<'UPDATE_RESERVATION'> {
    payload: Reservation;
}

type ReservationAction = AddReservationAction | RemoveReservationAction | UpdateReservationAction;

// Reservations reducer
const reservationsReducer = (state = initialReservationsState, action: ReservationAction | Action): Reservation[] => {
    switch (action.type) {
        case 'ADD_RESERVATION':
            return [...state, (action as AddReservationAction).payload];
        case 'REMOVE_RESERVATION':
            return state.filter(reservation => reservation.id !== (action as RemoveReservationAction).payload.id);
        case 'UPDATE_RESERVATION':
            return state.map(reservation =>
                reservation.id === (action as UpdateReservationAction).payload.id ? { ...reservation, ...(action as UpdateReservationAction).payload } : reservation
            );
        default:
            return state;
    }
};

// Rooms initial state
const initialRoomsState: Room[] = [];

// Define action types
interface AddRoomAction extends Action<'ADD_ROOM'> {
    payload: Room;
}

interface RemoveRoomAction extends Action<'REMOVE_ROOM'> {
    payload: { id: number };
}

interface UpdateRoomAction extends Action<'UPDATE_ROOM'> {
    payload: Room;
}

type RoomAction = AddRoomAction | RemoveRoomAction | UpdateRoomAction;

// Rooms reducer
const roomsReducer = (state = initialRoomsState, action: RoomAction | Action): Room[] => {
    switch (action.type) {
        case 'ADD_ROOM':
            return [...state, (action as AddRoomAction).payload];
        case 'REMOVE_ROOM':
            return state.filter(room => room.id !== (action as RemoveRoomAction).payload.id);
        case 'UPDATE_ROOM':
            return state.map(room =>
                room.id === (action as UpdateRoomAction).payload.id ? { ...room, ...(action as UpdateRoomAction).payload } : room
            );
        default:
            return state;
    }
};

// Define the RootState type
type RootState = {
    amenitiesReducer: Amenity[];
    reservationsReducer: Reservation[];
    roomsReducer: Room[];
};

// Combine reducers
const rootReducer = combineReducers({
    amenitiesReducer,
    reservationsReducer,
    roomsReducer,
});

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);