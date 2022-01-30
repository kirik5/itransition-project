import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
// import NoMatch from './components/noMatch/NoMatch'
import HomePage from './components/homePage/HomePage'
import useRoutes from './hooks/useRoutes'
import useAuth from './hooks/useAuth'
import AuthContext from './context/AuthContext'
import ColorModeContext from './context/ColorModeContext'
import Loader from './components/loader/Loader'
import { createTheme, ThemeProvider } from '@mui/material'

const App = () => {
    const { token, userId, login, logout, ready, email } = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    const [mode, setMode] = useState('light')
    const colorModeToggle = useCallback(() => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
    }, [setMode])

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    )

    useEffect(() => {
        if (!token) {
            setMode('light')
        }
    }, [token])

    return (
        <ColorModeContext.Provider value={{ colorModeToggle, mode, setMode }}>
            <ThemeProvider theme={theme}>
                <AuthContext.Provider
                    value={{
                        token,
                        userId,
                        login,
                        logout,
                        isAuthenticated,
                        email,
                    }}
                >
                    {!ready ? (
                        <Loader />
                    ) : (
                        <Routes>
                            <Route path="/" element={<HomePage />}>
                                {routes}
                            </Route>
                        </Routes>
                    )}
                </AuthContext.Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App
