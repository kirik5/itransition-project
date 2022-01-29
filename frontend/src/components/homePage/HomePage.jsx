import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, FormControlLabel, Switch } from '@mui/material'
import ButtonAppBar from '../appBar/AppBar'
import MenuDrawer from '../menuDrawer/MenuDrawer'
import MenuList from '../menuList/MenuList'
import ColorModeContext from '../../context/ColorModeContext'

const HomePage = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const colorMode = useContext(ColorModeContext)

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
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    height: '100vh',
                    width: '100vw',
                    color: 'text.primary',
                    bgcolor: 'background.default',
                    zIndex: '-1',
                }}
            />
            <Box
                sx={{
                    boxSizing: 'border-box',
                    color: 'text.primary',
                    bgcolor: 'background.default',
                }}
            >
                <ButtonAppBar onDrawerOpen={handleDrawerOpen} />
                <Outlet />
            </Box>
            <MenuDrawer open={isDrawerOpen} onClose={handleDrawerClose}>
                <MenuList onDrawerClose={handleDrawerClose} />
                <FormControlLabel
                    sx={{ marginTop: '20px', justifyContent: 'center' }}
                    value="start"
                    control={
                        <Switch
                            checked={colorMode.mode === 'dark'}
                            onChange={colorMode.colorModeToggle}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    }
                    label="Темная тема"
                    labelPlacement="end"
                />
            </MenuDrawer>
        </>
    )
}

export default HomePage
