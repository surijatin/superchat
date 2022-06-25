import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const root = ReactDOM.createRoot(document.getElementById('root'))

const theme = createTheme({
    palette: {
        primary: {
            main: '#371B58',
        },
        secondary: {
            main: '#4C3575',
        },
        color1: {
            main: '#5B4B8A',
        },
        color2: {
            main: '#7858A6',
        },
    },
})

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
)
