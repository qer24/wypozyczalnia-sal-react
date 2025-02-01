import {useForm} from "@mantine/form";
import {Button, Container, Group, TextInput} from "@mantine/core";
import {useAuth} from "./AuthContext.tsx";
import { useNavigate } from "react-router";

export function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            login: '',
            password: '',
        },
        validate: {
            login: (value) => (value.length >= 3 ? null : 'Login is too short'),
            password: (value) => (value.length >= 6 ? null : 'Password is too short'),
        },
    });

    const onFormSubmit = (values: any) => {
        if (values.login === 'admin' && values.password === 'password') {
            login(values.login);
            navigate('/');
        } else {
            form.setErrors({
                login: 'Invalid credentials',
                password: 'Invalid credentials'
            });
        }
    }

    return (
        <Container size="15%">
            <form onSubmit={form.onSubmit(onFormSubmit)}>
                <TextInput
                    withAsterisk
                    label="Nazwa użytkownika"
                    placeholder="Twoja nazwa"
                    data-autofocus
                    key={form.key('login')}
                    {...form.getInputProps('login')}
                />
                <TextInput
                    mt="md"
                    withAsterisk
                    label="Hasło"
                    placeholder="Twoje hasło"
                    type="password"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />
                <Group justify="center" mt="xl">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Container>
    );
}