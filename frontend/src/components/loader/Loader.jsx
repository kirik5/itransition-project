import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Loader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                position: 'fixed',
                width: '100%',
                height: '100%',
                left: '0',
                top: '0',
            }}
        >
            <CircularProgress
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50% -50%)',
                }}
            />
        </Box>
    )
}

export default Loader
