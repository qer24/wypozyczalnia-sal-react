import {useForm} from "@mantine/form";
import {modals} from "@mantine/modals";
import {Button, Group, TextInput} from "@mantine/core";
import {useAuth} from "./AuthContext.tsx";

export function LoginForm() {
    const { login } = useAuth();
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
            modals.closeAll();
        } else {
            form.setErrors({
                login: 'Invalid credentials',
                password: 'Invalid credentials'
            });
        }
    }

    return (
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
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    );
}