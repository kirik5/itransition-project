import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NoMatch from './components/noMatch/NoMatch'
import Home from './components/home/Home'
import useRoutes from './hooks/useRoutes'
import useAuth from './hooks/useAuth'
import AuthContext from './context/AuthContext'

const App = () => {
    const { token, userId, login, logout } = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider
            value={{
                token,
                userId,
                login,
                logout,
                isAuthenticated,
            }}
        >
            <Routes>
                <Route path="/" element={<Home />}>
                    {routes}
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </AuthContext.Provider>
    )
}

export default App
