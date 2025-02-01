import {useForm} from "@mantine/form";
import {Button, Group, Stack, TextInput} from "@mantine/core";
import {ReactNode} from "react";
import {Amenity} from "./interfaces/amenity.tsx";

interface AmenityFormProps {
    onSubmit: any;
    existingAmenity?: Amenity;
    buttonLabel?: string;
    buttonIcon?: ReactNode;
}

export function AmenityForm({ onSubmit, buttonLabel, buttonIcon, existingAmenity}: AmenityFormProps) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: existingAmenity ? existingAmenity.name : '',
            description: existingAmenity ? existingAmenity.description : '',
        },
        validate: {
            name: (value) => (value.length >= 2 ? null : 'Nazwa jest za krótka'),
            description: (value) => (value.length >= 3 ? null : 'Opis jest za krótki'),
        },
    });

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <TextInput
                    placeholder="Nazwa"
                    key={form.key('name')}
                    withAsterisk
                    {...form.getInputProps('name')}
                />
                <TextInput
                    placeholder="Opis"
                    key={form.key('description')}
                    withAsterisk
                    {...form.getInputProps('description')}
                />
                <Group justify="center">
                    <Button rightSection={buttonIcon} type="submit">{buttonLabel}</Button>
                </Group>
            </Stack>
        </form>
    );
}