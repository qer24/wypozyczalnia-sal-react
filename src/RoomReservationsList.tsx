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
import {notifications} from "@mantine/notifications";

interface RoomReservationsListProps {
    room: Room;
}

export function RoomReservationsList({room}: RoomReservationsListProps) {
    const dispatch = useDispatch();
    const reservations = useSelector((state: RootState) => state.reservations);
    const {user} = useAuth();

    const roomReservations = reservations.filter((reservation) => reservation.roomId === room.id);

    const sortedReservations = roomReservations.sort(
        (a, b) =>
            new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
    );

    const reservationsRows = sortedReservations.map((reservation) => (
        <Table.Tr key={reservation.id}>
            {user && (
                <Table.Td>{reservation.id}</Table.Td>
            )}
            {user && <Table.Td>{reservation.imie}</Table.Td>}
            {user && <Table.Td>{reservation.nazwisko}</Table.Td>}
            {user && <Table.Td>{reservation.email}</Table.Td>}
            <Table.Td>{new Date(reservation.startDateTime).toLocaleString()}</Table.Td>
            <Table.Td>{new Date(reservation.endDateTime).toLocaleString()}</Table.Td>
            {user && (
                <Table.Td>
                    <ActionIcon aria-label="Delete" onClick={() => removeReservation(reservation.id)}>
                        <IconTrash/>
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

        dispatch({type: 'ADD_RESERVATION', payload: newReservation});

        modals.closeAll();
        modals.open({
            title: <strong>Rezerwacje</strong>,
            children: <RoomDetails room={room}/>,
            size: 'xl',
        });

        notifications.show({
            title: 'Rezerwacja dodana',
            message: 'Rezerwacja została dodana pomyślnie',
            position: 'top-left',
            autoClose: 2000,
        });
    }

    const removeReservation = (id: number) => {
        console.log(`Deleting reservation with id ${id}`);
        dispatch({type: 'REMOVE_RESERVATION', payload: {id: id}});

        notifications.show({
            title: 'Rezerwacja usunięta',
            message: 'Rezerwacja została usunięta pomyślnie',
            position: 'top-left',
            autoClose: 2000,
        });
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
                        {user && <Table.Th>Imię</Table.Th>}
                        {user && <Table.Th>Nazwisko</Table.Th>}
                        {user && <Table.Th>Email</Table.Th>}
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
                <ShowModalButton modalChildren={<RoomReservationForm onSubmit={addReservation}/>}
                                 buttonText='Nowa rezerwacja'/>
            </Group>
        </>
    );
}