import {Room} from "./interfaces/room.tsx";
import {ActionIcon, Group, Table} from "@mantine/core";
import {ShowModalButton} from "./ShowModalButton.tsx";
import {ReservationFormData, RoomReservationForm} from "./RoomReservationForm.tsx";
import {useDispatch, useSelector} from "react-redux";
import {modals} from "@mantine/modals";
import {RoomDetails} from "./RoomDetails.tsx";
import {RootState} from "./store.tsx";
import {IconTrash} from "@tabler/icons-react";
import {useAuth} from "./AuthContext.tsx";

interface RoomReservationsListProps {
    room: Room;
}

export function RoomReservationsList({ room } : RoomReservationsListProps) {
    const dispatch = useDispatch();
    const reservations = useSelector((state: RootState) => state.reservations);
    const { user } = useAuth();

    const roomReservations = reservations.filter((reservation) => reservation.roomId === room.id);

    const reservationsRows = roomReservations.map((reservation) => (
        <Table.Tr key={reservation.id}>
            {user && (
                <Table.Td>{reservation.id}</Table.Td>
            )}
            <Table.Td>{reservation.imie}</Table.Td>
            <Table.Td>{reservation.nazwisko}</Table.Td>
            <Table.Td>{reservation.email}</Table.Td>
            <Table.Td>{new Date(reservation.startDateTime).toLocaleString()}</Table.Td>
            <Table.Td>{new Date(reservation.endDateTime).toLocaleString()}</Table.Td>
            {user && (
                <Table.Td>
                    <ActionIcon aria-label="Delete" onClick={() => removeReservation(reservation.id)}>
                        <IconTrash />
                    </ActionIcon>
                </Table.Td>
            )}
        </Table.Tr>
    ));

    const addReservation = (values: ReservationFormData) => {
        console.log(`Adding reservation with values`, values);

        const newReservation = {
            id: 0,
            roomId: room.id,
            imie: values.name,
            nazwisko: values.lastName,
            email: values.email,
            startDateTime: values.start?.toISOString(),
            endDateTime: values.end?.toISOString()
        }

        dispatch({ type: 'ADD_RESERVATION', payload: newReservation });

        modals.closeAll();
        modals.open({
            title: <strong>Rezerwacje</strong>,
            children: <RoomDetails room={ room } />,
            size: 'xl',
        });
    }

    const removeReservation = (id: number) => {
        console.log(`Deleting reservation with id ${id}`);
        dispatch({ type: 'REMOVE_RESERVATION', payload: { id: id } });
    }

    return (
        <>
            <h2 className='no-margin'>Rezerwacje</h2>
            <Table withColumnBorders withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        {user && (
                            <Table.Th>ID</Table.Th>
                        )}
                        <Table.Th>Imię</Table.Th>
                        <Table.Th>Nazwisko</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Data rozpoczęcia</Table.Th>
                        <Table.Th>Data zakończenia</Table.Th>
                        {user && (
                            <Table.Th>Akcje</Table.Th>
                        )}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {reservationsRows}
                </Table.Tbody>
            </Table>
            <Group justify='center'>
                <ShowModalButton modalChildren={ <RoomReservationForm onSubmit={addReservation} />} buttonText='Nowa rezerwacja' />
            </Group>
        </>
    );
}