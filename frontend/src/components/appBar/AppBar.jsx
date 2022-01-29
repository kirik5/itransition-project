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
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { alpha, InputBase, styled } from '@mui/material'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))

const ButtonAppBar = ({ onDrawerOpen }) => {
    const { isAuthenticated, logout, email } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
    }

    const handleLogin = () => {
        navigate('/auth')
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <AppBar position="static">
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={onDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Search
                        sx={{
                            flexGrow: 1,
                            display: 'block',
                            marginLeft: '0px',
                            '@media (min-width: 600px)': {
                                marginLeft: '10px',
                            },
                        }}
                    >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    {isAuthenticated ? (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: '0 0 0 auto',
                            }}
                        >
                            <Typography
                                component={'div'}
                                sx={{
                                    '@media (min-width: 600px)': {
                                        lineHeight: '1.5',
                                        marginTop: '-2px',
                                        marginRight: '10px',
                                        display: 'block',
                                    },
                                    display: 'none',
                                }}
                            >
                                {email?.split('@')[0]}
                            </Typography>
                            <Button
                                color="inherit"
                                onClick={handleLogout}
                                variant={'outlined'}
                            >
                                Выйти
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            color="inherit"
                            onClick={handleLogin}
                            variant={'outlined'}
                        >
                            Войти
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default ButtonAppBar
