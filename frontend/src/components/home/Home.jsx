import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'

const Home = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        minHeight: '100vh',
                        padding: '10px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div>Home page /</div>
                    <Outlet />
                </Box>
            </Container>
        </>
    )
}

export default Home
