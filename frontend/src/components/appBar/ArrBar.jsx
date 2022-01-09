import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AuthContext from '../../context/AuthContext'
import { useContext } from 'react'

const ButtonAppBar = ({ onDrawerOpen }) => {
    const { isAuthenticated, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={onDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Книги
                    </Typography>
                    {isAuthenticated && (
                        <Button color="inherit" onClick={handleLogout}>
                            Выйти
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default ButtonAppBar
