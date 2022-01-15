import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import Auth from '../components/auth/Auth'
import AddCollection from '../components/addCollection/AddCollection'
import AllCollectionsPage from '../components/allCollectionsPage/AllCollectionsPage'
import MyCollectionsPage from '../components/myCollectionsPage/MyCollectionsPage'

const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <>
                <Route
                    path="all-collections"
                    element={<AllCollectionsPage />}
                />
                <Route path="my-collections" element={<MyCollectionsPage />} />
                <Route path="add-collection" element={<AddCollection />} />
                <Route path="auth" element={<Auth />} />
                <Route path="" element={<Navigate to={'/my-collections'} />} />
            </>
        )
    }

    return (
        <>
            <Route path="" element={<Auth />} />
            <Route path="all-collections" element={<AllCollectionsPage />} />
            <Route path="*" element={<Navigate to={'/'} />} />
        </>
    )
}

export default useRoutes
