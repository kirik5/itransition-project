import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Loader from '../loader/Loader'
import useHttp from '../../hooks/useHttp'
import AllCollections from '../allCollections/AllCollections'

const AllCollectionsPage = () => {
    const [allCollections, setAllCollections] = useState(null)

    const { request, loading } = useHttp()

    useEffect(async () => {
        try {
            const allCollections = await request('/api/collections', 'GET')
            setAllCollections(allCollections)
        } catch (error) {}
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
                    {allCollections ? (
                        <AllCollections allCollections={allCollections} />
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

export default AllCollectionsPage
