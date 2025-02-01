import {IconLogin} from "@tabler/icons-react";
import {Button} from "@mantine/core";
import {useAuth} from "./AuthContext.tsx";
import { useNavigate } from "react-router";

export default function LoginButton() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const openLoginModal = () => {
        navigate('/login'); // Navigate to login route
    };

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to home after logout
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