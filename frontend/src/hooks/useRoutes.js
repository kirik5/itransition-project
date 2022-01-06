import React from 'react'
import { Route } from 'react-router-dom'
import Auth from '../components/auth/Auth'
import Collection from '../components/collection/Collection'
import AllCollections from '../components/allCollections/AllCollections'

const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <>
                <Route path="/all-collections" element={<AllCollections />} />
                <Route path="/collection" element={<Collection />} />
            </>
        )
    }

    return (
        <>
            <Route path="" element={<Auth />} />
            <Route path="all-collections" element={<AllCollections />} />
        </>
    )
}

export default useRoutes
