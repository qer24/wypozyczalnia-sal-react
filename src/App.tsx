import './App.css'

import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import LoginButton from "./LoginButton.tsx";
import {AuthProvider} from "./AuthContext.tsx";
import {ThemeSwitchButton} from "./ThemeSwitchButton.tsx";
import {Route, Routes} from "react-router";
import {LoginForm} from "./LoginForm.tsx";

const theme = createTheme({
    fontFamily: 'Open Sans, serif',
    primaryColor: 'violet',
    primaryShade: { light: 4, dark: 7 },
    defaultRadius : 'lg',
});

export default function App() {
  return (
    <AuthProvider>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
            <ModalsProvider>
                <Routes>
                    <Route path="/" element={
                        <div className="bar">
                            <ThemeSwitchButton />
                            <LoginButton />
                        </div>
                    } />

                    <Route path="login" element={<LoginForm />} />
                </Routes>
            </ModalsProvider>
        </MantineProvider>
    </AuthProvider>
  )
}
