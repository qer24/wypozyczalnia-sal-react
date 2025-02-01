import {IconLogin} from "@tabler/icons-react";
import {Button} from "@mantine/core";
import {useAuth} from "./AuthContext.tsx";
import { useNavigate } from "react-router";
import {notifications} from "@mantine/notifications";

export function LoginButton() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const openLoginModal = () => {
        navigate('/login'); // Navigate to login route
    };

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to home after logout

        notifications.show({
            title: 'Wylogowane',
            message: 'Zostałeś pomyślnie wylogowany/a',
            position: 'top-left',
            autoClose: 2000,
        });
    };

    if (user)
    {
        return (
            <Button rightSection={<IconLogin />} onClick={handleLogout}>Wyloguj</Button>
        )
    }

    return (
        <Button rightSection={<IconLogin />} onClick={openLoginModal}>Zaloguj</Button>
    )
}