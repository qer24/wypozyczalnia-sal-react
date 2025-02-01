# Room Management Application

This is a Room Management Application built with React, TypeScript, and Redux. It allows users to add rooms, view room details, and manage room reservations.

## Features

- Add new rooms with amenities
- View room details including capacity and amenities
- Manage room reservations (add and delete reservations)
- User authentication
- Notifications for actions

## Technologies Used

- React
- TypeScript
- Redux
- Mantine UI
- Tabler Icons
- React-Redux
- Mantine Modals
- Mantine Notifications

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/qer24/wypozyczalnia-sal-react.git
    cd wypozyczalnia-sal-react
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

## Usage

- **Add Room**: Click on the "Dodaj sale" button to open the modal for adding a new room. Fill in the details and submit the form.
- **View Room Details**: Click on a room to view its details including capacity and amenities.
- **Manage Reservations**: In the room details view, you can add new reservations or delete existing ones.

## Project Structure

- `src/RoomAddButton.tsx`: Component for adding a new room.
- `src/RoomDetails.tsx`: Component for displaying room details.
- `src/RoomReservationsList.tsx`: Component for listing and managing room reservations.
- `src/RoomReservationForm.tsx`: Form component for adding a new reservation.
- `src/assets/react.svg`: SVG asset for the React logo.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.