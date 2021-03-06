import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import Auth from '../components/auth/Auth'
import AddCollectionPage from '../components/addCollectionPage/AddCollectionPage'
import AllCollectionsPage from '../components/allCollectionsPage/AllCollectionsPage'
import MyCollectionsPage from '../components/myCollectionsPage/MyCollectionsPage'
import ChangeCurrentCollectionPage from '../components/changeCurrentCollectionPage/ChangeCurrentCollectionPage'
import CurrentCollectionPage from '../components/currentCollectionPage/CurrentCollectionPage'
import EditItemPage from '../components/editItemPage/EditItemPage'

const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <>
                <Route
                    path="all-collections"
                    element={<AllCollectionsPage />}
                />
                <Route path="my-collections" element={<MyCollectionsPage />} />
                <Route path="add-collection" element={<AddCollectionPage />} />
                <Route path="auth" element={<Auth />} />
                <Route
                    path="/my-collections/:collectionId"
                    element={<CurrentCollectionPage />}
                />
                <Route
                    path="/my-collections/change/:collectionId"
                    element={<ChangeCurrentCollectionPage />}
                />
                <Route
                    path="/my-collections/items/edit/:itemId"
                    element={<EditItemPage />}
                />
                <Route path="" element={<Navigate to={'/my-collections'} />} />
                <Route path="*" element={<Navigate to={'/'} />} />
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
