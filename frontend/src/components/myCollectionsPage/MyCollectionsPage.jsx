import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Loader from '../loader/Loader'
import useHttp from '../../hooks/useHttp'
import AuthContext from '../../context/AuthContext'
import MyCollections from '../myCollections/MyCollections'

const MyCollectionsPage = () => {
    const [myCollections, setMyCollections] = useState(null)
    const auth = useContext(AuthContext)

    const { request, loading } = useHttp()

    const getMyCollections = async () => {
        try {
            const myCollections = await request(
                '/api/collections/my',
                'GET',
                null,
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            )
            setMyCollections(myCollections)
        } catch (error) {}
    }

    const setFilteredCollections = filtered => setMyCollections(filtered)

    useEffect(async () => {
        getMyCollections()
    }, [])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Box
                    element={'div'}
                    sx={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '10px',
                    }}
                >
                    {myCollections ? (
                        <MyCollections
                            myCollections={myCollections}
                            setFilteredCollections={setFilteredCollections}
                        />
                    ) : (
                        <Box component={'div'} sx={{ color: 'red' }}>
                            Нет коллекций для отображения..(
                        </Box>
                    )}
                </Box>
            )}
        </>
    )
}

export default MyCollectionsPage
