import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import { useSelector } from "react-redux";
import { RootState } from "./store"; // Popraw ścieżkę do RootState

interface ReservationFormProps {
    onSubmit: (data: ReservationFormData) => void;
}

export interface ReservationFormData {
    name: string;
    lastName: string;
    email: string;
    start: Date | null;
    end: Date | null;
}

export function RoomReservationForm({ onSubmit }: ReservationFormProps) {
    // Pobieramy istniejące rezerwacje ze stanu Reduxa, aby sprawdzić nakładanie
    const existingReservations = useSelector((state: RootState) => state.reservations);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            lastName: "",
            email: "",
            start: null,
            end: null,
        },
        validate: (values: ReservationFormData) => {
            const errors: { [key: string]: string } = {};
            const now = new Date();

            // Walidacja imienia i nazwiska
            if (!values.name || values.name.length < 2) {
                errors.name = "Imię jest za krótkie";
            }
            if (!values.lastName || values.lastName.length < 2) {
                errors.lastName = "Nazwisko jest za krótkie";
            }

            // Walidacja email
            if (!values.email || !emailRegex.test(values.email)) {
                errors.email = "Nieprawidłowy email";
            }

            // Walidacja daty początkowej
            if (!values.start) {
                errors.start = "Data początkowa jest wymagana";
            } else if (values.start < now) {
                errors.start = "Data początkowa nie może być z przeszłości";
            }

            // Walidacja daty końcowej
            if (!values.end) {
                errors.end = "Data końcowa jest wymagana";
            } else if (values.end < now) {
                errors.end = "Data końcowa nie może być z przeszłości";
            } else if (values.start && values.end <= values.start) {
                errors.end = "Data końcowa musi być późniejsza od daty początkowej";
            }

            // Sprawdzanie nakładania się rezerwacji
            if (values.start && values.end && !errors.start && !errors.end) {
                const overlappingReservation = existingReservations.find((reservation) => {
                    const existingStart = new Date(reservation.startDateTime);
                    const existingEnd = new Date(reservation.endDateTime);
                    // Nowa rezerwacja nachodzi, jeśli:
                    // nowa.dataPoczątkowa < istniejąca.dataKońcowa && nowa.dataKońcowa > istniejąca.dataPoczątkowa
                    return values.start! < existingEnd && values.end! > existingStart;
                });
                if (overlappingReservation) {
                    errors.start = "Rezerwacja nachodzi na już istniejącą rezerwację";
                    errors.end = "Rezerwacja nachodzi na już istniejącą rezerwację";
                }
            }

            return errors;
        },
    });

    return (
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Stack>
                <TextInput
                    placeholder="Imię"
                    withAsterisk
                    {...form.getInputProps("name")}
                />

                <TextInput
                    placeholder="Nazwisko"
                    withAsterisk
                    {...form.getInputProps("lastName")}
                />

                <TextInput
                    placeholder="Email"
                    withAsterisk
                    {...form.getInputProps("email")}
                />

                <DateTimePicker
                    placeholder="Data początkowa"
                    withAsterisk
                    {...form.getInputProps("start")}
                />

                <DateTimePicker
                    placeholder="Data końcowa"
                    withAsterisk
                    {...form.getInputProps("end")}
                />

                <Group justify="center">
                    <Button type="submit">Dodaj</Button>
                </Group>
            </Stack>
        </form>
    );
}
