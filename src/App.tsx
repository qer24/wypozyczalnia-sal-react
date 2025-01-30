import './App.css'

import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import LoginButton from "./LoginButton.tsx";
import {AuthProvider} from "./AuthContext.tsx";

const theme = createTheme({
    fontFamily: 'Open Sans, serif',
    primaryColor: 'violet',
    primaryShade: 6,
    defaultRadius : 'lg',

});

export default function App() {
  return (
    <AuthProvider>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
            <ModalsProvider>
                <LoginButton />
            </ModalsProvider>
        </MantineProvider>
    </AuthProvider>
  )
}
