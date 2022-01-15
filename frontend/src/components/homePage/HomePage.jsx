import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import ButtonAppBar from '../appBar/ArrBar'
import MenuDrawer from '../menuDrawer/MenuDrawer'
import MenuList from '../menuList/MenuList'

const HomePage = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false)

    const handleDrawerClose = () => {
        setDrawerOpen(false)
    }

    const handleDrawerOpen = () => {
        setDrawerOpen(true)
    }

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <ButtonAppBar onDrawerOpen={handleDrawerOpen} />
                <Outlet />
            </Box>
            <MenuDrawer open={isDrawerOpen} onClose={handleDrawerClose}>
                <MenuList onDrawerClose={handleDrawerClose} />
            </MenuDrawer>
        </>
    )
}

export default HomePage
