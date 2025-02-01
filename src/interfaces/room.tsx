import { Amenity } from './amenity.tsx';
import { Reservation } from "./reservation.tsx";

export interface Room {
    id: number,
    nazwa: string,
    pojemnosc: number,
    udogodnienia: Amenity[],
    rezerwacje: Reservation[]
}