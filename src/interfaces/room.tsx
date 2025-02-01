import { Amenity } from './amenity.tsx';

export interface Room {
    id: number,
    nazwa: string,
    pojemnosc: number,
    udogodnienia?: Amenity[],
}