import { ActionIcon, Group, Table, TextInput } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store.tsx";
import { IconEdit, IconEye, IconSearch, IconTrash } from "@tabler/icons-react";
import { Room } from "./interfaces/room.tsx";
import { Amenity } from "./interfaces/amenity.tsx";
import { ShowModalButton } from "./ShowModalButton.tsx";
import { RoomForm } from "./RoomForm.tsx";
import { modals } from "@mantine/modals";
import { useAuth } from "./AuthContext.tsx";
import { useMemo, useState } from "react";
import { RoomDetails } from "./RoomDetails.tsx";
import { notifications } from "@mantine/notifications";

export function RoomList() {
    const rooms = useSelector((state: RootState) => state.rooms);
    const amenities = useSelector((state: RootState) => state.amenities);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");

    // Stany sortowania
    const [sortField, setSortField] = useState<"id" | "nazwa" | "pojemnosc">("id");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredRooms = useMemo(() => {
        return rooms.filter((room) => {
            const lowerQuery = searchQuery.toLowerCase();

            let amenityNames = "";
            if (room.udogodnienia) {
                amenityNames = room.udogodnienia
                    .map((amenity) => {
                        const foundAmenity = amenities.find((a) => a.id === amenity.id);
                        return foundAmenity ? foundAmenity.name : "";
                    })
                    .join(" ")
                    .toLowerCase();
            }

            return (
                room.id.toString().includes(searchQuery) ||
                room.nazwa.toLowerCase().includes(lowerQuery) ||
                room.pojemnosc.toString().includes(searchQuery) ||
                amenityNames.includes(lowerQuery)
            );
        });
    }, [rooms, amenities, searchQuery]);

    // Sortowanie po wybranym polu i kierunku
    const sortedRooms = useMemo(() => {
        const sorted = [...filteredRooms].sort((a, b) => {
            let aValue: number | string, bValue: number | string;
            if (sortField === "id") {
                aValue = a.id;
                bValue = b.id;
            } else if (sortField === "nazwa") {
                aValue = a.nazwa.toLowerCase();
                bValue = b.nazwa.toLowerCase();
            } else if (sortField === "pojemnosc") {
                aValue = a.pojemnosc;
                bValue = b.pojemnosc;
            } else {
                aValue = "";
                bValue = "";
            }

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredRooms, sortField, sortDirection]);

    // Funkcja zmieniająca kryterium sortowania
    const handleSort = (field: "id" | "nazwa" | "pojemnosc") => {
        if (sortField === field) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const getUdogodnienia = (room: Room) => {
        if (!room.udogodnienia || room.udogodnienia.length === 0) {
            return null;
        }

        const currentAmenities = room.udogodnienia
            .map((amenity) => amenities.find((a) => a.id === amenity.id))
            .filter((a): a is Amenity => a !== undefined);

        return currentAmenities.map((amenity, index) => (
            <span key={amenity.id}>
        {amenity.name}
                {index !== currentAmenities.length - 1 && ", "}
      </span>
        ));
    };

    const rows = sortedRooms.map((room) => (
        <Table.Tr key={room.id}>
            <Table.Td>{room.id}</Table.Td>
            <Table.Td>{room.nazwa}</Table.Td>
            <Table.Td>{room.pojemnosc}</Table.Td>
            <Table.Td>{getUdogodnienia(room)}</Table.Td>
            <Table.Td>
                <Group>
                    <ShowModalButton
                        modalChildren={<RoomDetails room={room} />}
                        buttonIcon={<IconEye />}
                        modalTitle={room.nazwa}
                        size="xl"
                    />
                    {user && (
                        <>
                            <ShowModalButton
                                modalChildren={
                                    <RoomForm
                                        onSubmit={(values: any) => onEdit(values, room)}
                                        existingRoom={room}
                                        buttonLabel="Akceptuj"
                                    />
                                }
                                buttonIcon={<IconEdit />}
                            />
                            <ActionIcon aria-label="Delete" onClick={() => onDelete(room.id)}>
                                <IconTrash />
                            </ActionIcon>
                        </>
                    )}
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    const onEdit = (values: any, existingRoom: any) => {
        console.log(`Editing room with id ${existingRoom.id} with values`, values);

        const selectedAmenities = amenities.filter((amenity: any) =>
            values.amenities.includes(amenity.id.toString())
        );

        const updatedRoom: Room = {
            id: existingRoom.id,
            nazwa: values.name,
            pojemnosc: values.capacity,
            udogodnienia: selectedAmenities,
        };

        dispatch({ type: "UPDATE_ROOM", payload: updatedRoom });

        modals.closeAll();

        notifications.show({
            title: "Sala zaktualizowana",
            message: "Sala została zaktualizowana pomyślnie",
            position: "top-left",
            autoClose: 2000,
        });
    };

    const onDelete = (id: number) => {
        console.log(`Deleting room with id ${id}`);
        dispatch({ type: "REMOVE_ROOM", payload: { id: id } });

        notifications.show({
            title: "Sala usunięta",
            message: "Sala została usunięta pomyślnie",
            position: "top-left",
            autoClose: 2000,
        });
    };

    return (
        <>
            <Group justify="start">
                <p>Szukaj</p>
                <TextInput
                    placeholder="Wpisz aby wyszukać..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.currentTarget.value)}
                    rightSection={<IconSearch />}
                    rightSectionPointerEvents="none"
                />
            </Group>
            <Table withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                            ID {sortField === "id" && (sortDirection === "asc" ? "▲" : "▼")}
                        </Table.Th>
                        <Table.Th onClick={() => handleSort("nazwa")} style={{ cursor: "pointer" }}>
                            Nazwa {sortField === "nazwa" && (sortDirection === "asc" ? "▲" : "▼")}
                        </Table.Th>
                        <Table.Th onClick={() => handleSort("pojemnosc")} style={{ cursor: "pointer" }}>
                            Pojemność {sortField === "pojemnosc" && (sortDirection === "asc" ? "▲" : "▼")}
                        </Table.Th>
                        <Table.Th>Udogodnienia</Table.Th>
                        <Table.Th>Akcje</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
}
