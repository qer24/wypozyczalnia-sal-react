import {useNavigate, useSearchParams } from "react-router";
import { notifications } from '@mantine/notifications';
import { useEffect } from "react";

export function HomeNotification() {
    const [searchParams] = useSearchParams();
    const loginSuccess = searchParams.get('login-success');
    const navigate = useNavigate();

    useEffect(() => {
        if (loginSuccess === 'true') {
            const id = notifications.show({
                title: 'Login success',
                message: 'You have been logged in successfully',
                position: 'top-left',
                autoClose: 2000,
            });

            // Delay the navigation slightly
            const timeoutId = setTimeout(() => {
                navigate('/');
            }, 2000); // Adjust the delay as needed

            return () => {
                clearTimeout(timeoutId);
                notifications.hide(id);
            }
        }
    }, [loginSuccess]);

    return (
        <>

        </>
    );
}