import {ActionIcon, Group, Table} from "@mantine/core";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store.tsx";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {Room} from "./interfaces/room.tsx";
import {Amenity} from "./interfaces/amenity.tsx";
import {ShowModalButton} from "./ShowModalButton.tsx";
import {RoomForm} from "./RoomForm.tsx";
import {modals} from "@mantine/modals";

export function RoomList() {
    const rooms = useSelector((state: RootState) => state.rooms);
    const amenities = useSelector((state: RootState) => state.amenities);
    const dispatch = useDispatch();

    const getUdogodnienia = (room: Room) => {
        console.log(room.udogodnienia);

        if (!room.udogodnienia || room.udogodnienia.length === 0) {
            return null;
        }

        const currentAmenities = room.udogodnienia
            .map(amenity => amenities.find(a => a.id === amenity.id))
            .filter((a): a is Amenity => a !== undefined);

        return currentAmenities.map((amenity, index) => (
            <span key={amenity.id}>
                {amenity.name}
                {index !== currentAmenities.length - 1 && ', '}
            </span>
        ));
    }

    const rows = rooms.map(room => (
        <Table.Tr key={room.id}>
            <Table.Td>{room.id}</Table.Td>
            <Table.Td>{room.nazwa}</Table.Td>
            <Table.Td>{room.pojemnosc}</Table.Td>
            <Table.Td>
                {getUdogodnienia(room)}
            </Table.Td>
            <Table.Td>
                <Group>
                    <ShowModalButton modalChildren={ <RoomForm
                        onSubmit={(values: any) => onEdit(values, room)}
                        existingRoom={room}
                        buttonLabel='Akceptuj'/>
                    } buttonIcon={ <IconEdit /> }/>
                    <ActionIcon aria-label="Delete" onClick={() => onDelete(room.id)}> <IconTrash /> </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    const onEdit = (values: any, existingRoom: any) => {
        console.log(`Editing room with id ${existingRoom.id} with values`, values);

        const selectedAmenities = amenities.filter((amenity: any) => values.amenities.includes(amenity.id.toString()));

        const updatedRoom: Room = {
            id: existingRoom.id,
            nazwa: values.name,
            pojemnosc: values.capacity,
            udogodnienia: selectedAmenities,
        }

        dispatch({ type: 'UPDATE_ROOM', payload: updatedRoom });

        modals.closeAll();
    }

    const onDelete = (id: number) => {
        console.log(`Deleting room with id ${id}`);
        dispatch({ type: 'REMOVE_ROOM', payload: { id: id } });
    }

    return (
        <Table withTableBorder withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Nazwa</Table.Th>
                    <Table.Th>Pojemność</Table.Th>
                    <Table.Th>Udogodnienia</Table.Th>
                    <Table.Th>Akcje</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}