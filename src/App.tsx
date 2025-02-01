import './App.css'

import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import {AuthProvider} from "./AuthContext.tsx";
import {ThemeSwitchButton} from "./ThemeSwitchButton.tsx";
import {Route, Routes} from "react-router";
import {LoginForm} from "./LoginForm.tsx";
import {HomeNotification} from "./HomeNotification.tsx";
import {LoginButton} from "./LoginButton.tsx";
import {Notifications} from "@mantine/notifications";

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
            <Notifications />
            <ModalsProvider>
                <Routes>
                    <Route path="/" element={
                        <>
                            <HomeNotification />
                            <div className="bar">
                                <ThemeSwitchButton />
                                <LoginButton />
                            </div>
                        </>
                    } />

                    <Route path="login" element={<LoginForm />} />
                </Routes>
            </ModalsProvider>
        </MantineProvider>
    </AuthProvider>
  )
}
