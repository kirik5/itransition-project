import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const ItemsList = ({ items }) => {
    return (
        <Box>
            <Typography
                variant={'h6'}
                component={'h2'}
                sx={{ marginTop: '20px' }}
            >
                Записи коллекции
            </Typography>
        </Box>
    )
}

export default ItemsList
