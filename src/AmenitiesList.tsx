import {useDispatch, useSelector} from 'react-redux';
import { RootState } from './store';
import { Amenity } from './interfaces/amenity.tsx'
import {AmenityItem} from "./AmenityItem.tsx";

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

    return (
        <div>
            <ul>
                {amenities.map((amenity: Amenity) => (
                    <li key={amenity.id}>
                        <AmenityItem amenity={amenity} onEdit={handleEdit} onDelete={handleDelete} />
                    </li>
                ))}
            </ul>
        </div>
    );
}