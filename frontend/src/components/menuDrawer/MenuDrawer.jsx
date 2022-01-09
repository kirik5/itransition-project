import * as React from 'react'
import Drawer from '@mui/material/Drawer'

const MenuDrawer = ({ children, open, onClose }) => {
    return (
        <Drawer anchor={'left'} open={open} onClose={onClose}>
            {children}
        </Drawer>
    )
}

export default MenuDrawer
