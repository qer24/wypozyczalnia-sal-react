import {RoomForm} from "./RoomForm.tsx";
import {IconAddressBook} from "@tabler/icons-react";
import {ShowModalButton} from "./ShowModalButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {modals} from "@mantine/modals";
import {Room} from "./interfaces/room.tsx";
import {RootState} from "./store.tsx";
import {useAuth} from "./AuthContext.tsx";

export function RoomAddButton() {
    const amenities = useSelector((state: RootState) => state.amenities);
    const dispatch = useDispatch();
    const { user } = useAuth();

    const onFormAdd = (values: any) => {
        console.log('Adding room', values);

        const selectedAmenities = amenities.filter((amenity: any) => values.amenities.includes(amenity.id.toString()));

        const newRoom : Room = {
            id: 0,
            nazwa: values.name,
            pojemnosc: values.capacity,
            udogodnienia: selectedAmenities,
        }
        dispatch({ type: 'ADD_ROOM', payload: newRoom });
        modals.closeAll();
    }

    if (!user) {
        return null;
    }

    return (
        <ShowModalButton
            modalTitle='Tworzenie sali'
            modalChildren={ <RoomForm onSubmit={onFormAdd} buttonLabel='Dodaj nową salę' buttonIcon= {<IconAddressBook/>} />}
            buttonIcon={ <IconAddressBook/> }
            buttonText='Dodaj sale'
            size='lg'/>
    );
}