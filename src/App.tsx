import './App.css'

import '@mantine/core/styles.css';
import { createTheme, MantineProvider, Stack} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import {AuthProvider} from "./AuthContext.tsx";
import {ThemeSwitchButton} from "./ThemeSwitchButton.tsx";
import {Route, Routes} from "react-router";
import {LoginForm} from "./LoginForm.tsx";
import {HomeNotification} from "./HomeNotification.tsx";
import {LoginButton} from "./LoginButton.tsx";
import {Notifications} from "@mantine/notifications";
import {ShowModalButton} from "./ShowModalButton.tsx";
import {IconFileInfo} from "@tabler/icons-react";
import {AmenitiesList} from "./AmenitiesList.tsx";

const theme = createTheme({
    fontFamily: 'Open Sans, serif',
    primaryColor: 'violet',
    primaryShade: { light: 4, dark: 7 },
    defaultRadius : 'lg',
    components: {
        ActionIcon: {
            defaultProps: {
                size: 'lg',
            },
        },
    },
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
                            <Stack>
                                <div className="bar">
                                    <ThemeSwitchButton />
                                    <LoginButton />
                                </div>
                                <div className="bar">
                                    <ShowModalButton
                                        modalTitle='Udogodnienia'
                                        modalChildren={ <AmenitiesList /> }
                                        buttonIcon={ <IconFileInfo /> }
                                        buttonText='Przeglądaj udogodnienia'
                                        size='lg'
                                    />
                                </div>
                            </Stack>
                        </>
                    } />

                    <Route path="login" element={<LoginForm />} />
                </Routes>
            </ModalsProvider>
        </MantineProvider>
    </AuthProvider>
  )
}
