import {IconLogin} from "@tabler/icons-react";
import {Button} from "@mantine/core";
import {modals} from "@mantine/modals";
import {LoginForm} from "./LoginForm.tsx";
import {useAuth} from "./AuthContext.tsx";

export default function LoginButton() {
    const { user, logout } = useAuth();

    const openLoginModal = () => modals.open({
        title: 'Logowanie',
        children: <LoginForm />,
    });

    const handleLogout = () => {
        logout();
        modals.closeAll();
        // navigate('/') if using routing
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