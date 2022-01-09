import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Loader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: '50%',
                top: '50%',
                transform: 'translate(-50% -50%)',
            }}
        >
            <CircularProgress />
        </Box>
    )
}

export default Loader
