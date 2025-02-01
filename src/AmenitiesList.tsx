import {useDispatch, useSelector} from 'react-redux';
import { RootState } from './store';
import { Amenity } from './interfaces/amenity.tsx'
import {AmenityItem} from "./AmenityItem.tsx";
import {ShowModalButton} from "./ShowModalButton.tsx";
import {Group} from "@mantine/core";
import {IconLibraryPlus} from "@tabler/icons-react";
import {AmenityForm} from "./AmenityForm.tsx";
import {modals} from "@mantine/modals";

export function AmenitiesList() {
    const amenities = useSelector((state: RootState) => state.amenities);
    const dispatch = useDispatch();

    function handleDelete(id: number) {
        console.log(`Deleting amenity with id ${id}`);
        dispatch({ type: 'REMOVE_AMENITY', payload: { id: id } });
    }

    function handleEdit(id: number) {
        console.log(`Editing amenity with id ${id}`);
    }

    const onFormAdd = (values: any) => {
        console.log('Adding amenity', values);
        const newAmenity: Amenity = {
            id: 0,
            name: values.name,
            description: values.description,
        }
        dispatch({ type: 'ADD_AMENITY', payload: newAmenity });
        modals.closeAll();
        modals.open({
            title: <strong>Udogodnienia</strong>,
            children: <AmenitiesList />,
            size: 'lg',
        });
    }

    return (
        <>
            <ul>
                {amenities.map((amenity: Amenity) => (
                    <li key={amenity.id}>
                        <AmenityItem amenity={amenity} onEdit={handleEdit} onDelete={handleDelete} />
                    </li>
                ))}
            </ul>
            <Group justify="center">
                <ShowModalButton
                    modalTitle='Nowe udogodnienie'
                    modalChildren={
                        <AmenityForm onSubmit={onFormAdd} buttonLabel='Dodaj' buttonIcon={ <IconLibraryPlus/> }/>
                    }
                    buttonText={"Nodaj nowe"}
                    buttonIcon={ <IconLibraryPlus/> }/>
            </Group>
        </>
    );
}