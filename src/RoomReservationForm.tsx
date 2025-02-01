import {Button, Group, Stack, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {DateTimePicker} from "@mantine/dates";

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
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            start: null,
            end: null,
        },
        validate: {
            name: (value) => (value.length >= 2 ? null : 'Imię jest za krótkie'),
            lastName: (value) => (value.length >= 2 ? null : 'Nazwisko jest za krótkie'),
            email: (value) => (emailRegex.test(value) ? null : 'Nieprawidłowy email'),
            start: (value) => (value ? null : 'Data początkowa jest wymagana'),
            end: (value) => (value ? null : 'Data końcowa jest wymagana'),
        },
    })

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const data = form.getValues();

    return (
        <form onSubmit={form.onSubmit(() => onSubmit(data))}>
            <Stack>
                <TextInput
                    placeholder="Imię"
                    key={form.key('name')}
                    withAsterisk
                    {...form.getInputProps('name')}/>

                <TextInput
                    placeholder="Nazwisko"
                    key={form.key('lastName')}
                    withAsterisk
                    {...form.getInputProps('lastName')}/>

                <TextInput
                    placeholder="Email"
                    key={form.key('email')}
                    withAsterisk
                    {...form.getInputProps('email')}/>

                <DateTimePicker
                    placeholder="Data początkowa"
                    key={form.key('start')}
                    withAsterisk
                    {...form.getInputProps('start')}/>

                <DateTimePicker
                    placeholder="Data końcowa"
                    key={form.key('end')}
                    withAsterisk
                    {...form.getInputProps('end')}/>

                <Group justify="center">
                    <Button type="submit">Dodaj</Button>
                </Group>
            </Stack>
        </form>
    );
}