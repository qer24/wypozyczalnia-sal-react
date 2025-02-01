import {useDispatch, useSelector} from 'react-redux';
import { RootState } from './store';
import { Amenity } from './interfaces/amenity.tsx'
import {AmenityItem} from "./AmenityItem.tsx";
import {ShowModalButton} from "./ShowModalButton.tsx";
import {Group} from "@mantine/core";
import {IconLibraryPlus} from "@tabler/icons-react";
import {AmenityForm} from "./AmenityForm.tsx";
import {modals} from "@mantine/modals";
import {useAuth} from "./AuthContext.tsx";

export function AmenitiesList() {
    const amenities = useSelector((state: RootState) => state.amenities);
    const dispatch = useDispatch();
    const { user } = useAuth();

    function handleDelete(id: number) {
        console.log(`Deleting amenity with id ${id}`);
        dispatch({ type: 'REMOVE_AMENITY', payload: { id: id } });
    }

    function handleEdit(id: number) {
        const existingAmenity = amenities.find(amenity => amenity.id === id);
        modals.open({
            title: <strong>Edytowanie</strong>,
            children: <AmenityForm
                onSubmit={(values: any) => onFormEdit(values, existingAmenity)}
                existingAmenity={existingAmenity}
                buttonLabel='Akceptuj'/>,
        });
    }

    const onFormEdit = (values: any, existingAmenity: any) => {
        console.log('Editing amenity', existingAmenity, values);
        const updatedAmenity: Amenity = {
            id: existingAmenity.id,
            name: values.name,
            description: values.description,
        }
        dispatch({ type: 'UPDATE_AMENITY', payload: updatedAmenity });
        modals.closeAll();
        modals.open({
            title: <strong>Udogodnienia</strong>,
            children: <AmenitiesList />,
            size: 'lg',
        });
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
            {user && (
                <Group justify="center">
                    <ShowModalButton
                        modalTitle='Nowe udogodnienie'
                        modalChildren={
                            <AmenityForm onSubmit={onFormAdd} buttonLabel='Dodaj' buttonIcon={ <IconLibraryPlus/> }/>
                        }
                        buttonText={"Nodaj nowe"}
                        buttonIcon={ <IconLibraryPlus/> }/>
                </Group>
            )}
        </>
    );
}