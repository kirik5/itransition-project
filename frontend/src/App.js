import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import NoMatch from './components/noMatch/NoMatch'
import Home from './components/home/Home'
import useRoutes from './hooks/useRoutes'
import useAuth from './hooks/useAuth'
import AuthContext from './context/AuthContext'
import Loader from './components/loader/Loader'

const App = () => {
    const { token, userId, login, logout, ready } = useAuth()
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
            {!ready ? (
                <Loader />
            ) : (
                <Routes>
                    <Route path="/" element={<Home />}>
                        {routes}
                        {/*<Route path="*" element={<NoMatch />} />*/}
                    </Route>
                </Routes>
            )}
        </AuthContext.Provider>
    )
}

export default App
