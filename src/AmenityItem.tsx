﻿import {ActionIcon, Group} from "@mantine/core";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {Amenity} from "./interfaces/amenity.tsx";
import {useAuth} from "./AuthContext.tsx";

interface AmenityItemProps {
    amenity: Amenity;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function AmenityItem({ amenity, onEdit, onDelete }: AmenityItemProps) {
    const { user } = useAuth();

    return (
        <Group align="center">
            <p style={{ flex: 1 }}>
                <b>ID: {amenity.id}</b> {amenity.name} - {amenity.description}
            </p>
            {user && (
                <>
                    <ActionIcon aria-label="Edit" onClick={() => onEdit(amenity.id)}>
                        <IconEdit />
                    </ActionIcon>
                    <ActionIcon aria-label="Delete" onClick={() => onDelete(amenity.id)}>
                        <IconTrash />
                    </ActionIcon>
                </>
            )}
        </Group>
    );
}