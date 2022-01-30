import React, { useCallback, useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Loader from '../loader/Loader'
import useHttp from '../../hooks/useHttp'
import AuthContext from '../../context/AuthContext'
import MyCollections from '../myCollections/MyCollections'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const MyCollectionsPage = () => {
    const [myCollections, setMyCollections] = useState(null)
    const auth = useContext(AuthContext)

    const { request, loading } = useHttp()

    const getMyCollections = useCallback(async () => {
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
    }, [])

    const setFilteredCollections = filtered => setMyCollections(filtered)

    useEffect(() => {
        getMyCollections()
        return () => {
            setMyCollections(null)
        }
    }, [getMyCollections, setMyCollections])

    const navigate = useNavigate()

    const handleAddCollection = () => {
        navigate('/add-collection')
    }

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
                        bgcolor: 'background.default',
                        color: 'text.primary',
                    }}
                >
                    {myCollections?.length ? (
                        <MyCollections
                            myCollections={myCollections}
                            setFilteredCollections={setFilteredCollections}
                        />
                    ) : (
                        <Typography component={'div'} sx={{ color: 'red' }}>
                            Нет коллекций для отображения..(
                        </Typography>
                    )}
                    <Button variant={'contained'} onClick={handleAddCollection}>
                        Добавить коллекцию
                    </Button>
                </Box>
            )}
        </>
    )
}

export default MyCollectionsPage
