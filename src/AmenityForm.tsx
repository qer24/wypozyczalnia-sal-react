﻿import {useForm} from "@mantine/form";
import {Button, Group, Stack, TextInput} from "@mantine/core";
import {ReactNode} from "react";

interface AmenityFormProps {
    onSubmit: any;
    buttonLabel?: string;
    buttonIcon?: ReactNode;
}

export function AmenityForm({ onSubmit, buttonLabel, buttonIcon }: AmenityFormProps) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            description: '',
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