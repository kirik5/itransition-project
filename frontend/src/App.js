import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NoMatch from './components/noMatch/NoMatch'
import Home from './components/home/Home'
import useRoutes from './hooks/useRoutes'

const App = () => {
    const routes = useRoutes(false)

    return (
        <Routes>
            <Route path="/" element={<Home />}>
                {routes}
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    )
}

export default App
