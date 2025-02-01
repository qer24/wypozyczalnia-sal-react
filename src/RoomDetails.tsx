import {Room} from "./interfaces/room.tsx";
import {Stack} from "@mantine/core";
import {RoomReservationsList} from "./RoomReservationsList.tsx";

interface RoomDetailsProps {
    room: Room;
}

export function RoomDetails({ room } : RoomDetailsProps) {
    return (
        <Stack gap="xs">
            <p className='no-margin'><b>ID:</b> {room.id}</p>
            <p className='no-margin'><b>Pojemność:</b> {room.pojemnosc}</p>
            <p className='no-margin'><b>Udogodnienia:</b> {room.udogodnienia?.map((amenity) => amenity.name).join(', ')}</p>
            <RoomReservationsList room={room} />
        </Stack>
    );
}