import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import { Provider } from 'react-redux'
import { store, persistor } from "./store.tsx";
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </StrictMode>
    </BrowserRouter>
)
