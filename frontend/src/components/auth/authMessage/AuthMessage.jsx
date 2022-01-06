import React, { useEffect } from 'react'
import { Alert, Snackbar } from '@mui/material'

const AuthMessage = ({
    error,
    clearError,
    successMessage,
    clearSuccessMessage,
}) => {
    const [openError, setOpenError] = React.useState(!!error)
    const [openSuccess, setOpenSuccess] = React.useState(!!successMessage)

    useEffect(() => {
        setOpenError(!!error)
        setOpenSuccess(!!successMessage)
    }, [error, successMessage])

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        clearError()
    }

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        clearSuccessMessage()
    }

    return (
        <>
            <Snackbar
                open={openError}
                autoHideDuration={6000}
                onClose={handleCloseError}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseError}
                    severity={'error'}
                    sx={{ width: '100%' }}
                >
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSuccess}
                autoHideDuration={6000}
                onClose={handleCloseSuccess}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSuccess}
                    severity={'success'}
                    sx={{ width: '100%' }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AuthMessage
