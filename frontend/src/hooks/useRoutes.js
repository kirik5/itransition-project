import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import Auth from '../components/auth/Auth'
import Collection from '../components/collection/Collection'
import AllCollections from '../components/allCollections/AllCollections'
import AddCollection from '../components/addCollection/AddCollection'

const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <>
                <Route path="all-collections" element={<AllCollections />} />
                <Route path="my-collection" element={<Collection />} />
                <Route path="add-collection" element={<AddCollection />} />
                <Route path="" element={<Navigate to={'/my-collection'} />} />
            </>
        )
    }

    return (
        <>
            <Route path="" element={<Auth />} />
            <Route path="all-collections" element={<AllCollections />} />
            <Route path="*" element={<Navigate to={'/'} />} />
        </>
    )
}

export default useRoutes
