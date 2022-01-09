import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import { Link, List, ListItem, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'
import links from './links'
import AuthContext from '../../context/AuthContext'

const MenuList = ({ onDrawerClose }) => {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={onDrawerClose}
            onKeyDown={onDrawerClose}
        >
            <List>
                {(isAuthenticated ? links.private : links.public).map(
                    (link, index) => (
                        <ListItem button key={index}>
                            <Link
                                component={NavLink}
                                to={link.link}
                                underline="none"
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                {link.icon}
                                <ListItemText
                                    primary={link.title}
                                    sx={{ marginLeft: '10px' }}
                                />
                            </Link>
                        </ListItem>
                    )
                )}
            </List>
        </Box>
    )
}

export default MenuList
