import {useForm} from "@mantine/form";
import {Button, Group, MultiSelect, NumberInput, Stack, TextInput} from "@mantine/core";
import {ReactNode} from "react";
import {Room} from "./interfaces/room.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./store.tsx";

interface RoomFormProps {
    onSubmit: any;
    existingRoom?: Room;
    buttonLabel?: string;
    buttonIcon?: ReactNode;
}

export function RoomForm({ onSubmit, buttonLabel, buttonIcon, existingRoom}: RoomFormProps) {
    const amenities = useSelector((state: RootState) => state.amenities);

    const options = amenities.map((amenity) => (
        { value: amenity.id.toString(), label: amenity.name }
    ));

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: existingRoom ? existingRoom.nazwa : '',
            capacity: existingRoom ? existingRoom.pojemnosc : 0,
            amenities: existingRoom && existingRoom.udogodnienia ? existingRoom.udogodnienia.map((amenity) => amenity.id.toString()) : [],
        },
        validate: {
            name: (value) => (value.length >= 2 ? null : 'Nazwa jest za krótka'),
            capacity: (value) => (value >= 1 ? null : 'Pojemność musi być większa od 0'),
        },
    });

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <TextInput
                    placeholder="Nazwa"
                    key={form.key('name')}
                    withAsterisk
                    {...form.getInputProps('name')}/>

                <NumberInput
                    placeholder="0"
                    key={form.key('capacity')}
                    withAsterisk
                    {...form.getInputProps('capacity')}/>

                <MultiSelect
                    placeholder='Wybierz udogodnienia'
                    data={options}
                    key={form.key('amenities')}
                    {...form.getInputProps('amenities')}/>

                <Group justify="center">
                    <Button rightSection={buttonIcon} type="submit">{buttonLabel}</Button>
                </Group>
            </Stack>
        </form>
    );
}