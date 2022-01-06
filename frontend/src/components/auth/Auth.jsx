import React, { useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from '@mui/material'
import useHttp from '../../hooks/useHttp'
import AuthMessage from './authMessage/AuthMessage'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Auth = () => {
    const {
        loading,
        error,
        request,
        clearError,
        successMessage,
        clearSuccessMessage,
    } = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = event => {
        event.preventDefault()
    }

    const isButtonDisabled =
        loading || form.email === '' || form.password === ''

    const checkEmail = value => {
        const pattern = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/
        return new RegExp(pattern).test(value.trim())
    }

    const checkPassword = value => {
        return value.trim().length >= 6
    }

    const handleChangeField = fieldName => event => {
        setForm({ ...form, [fieldName]: event.target.value })

        if (fieldName === 'email' && checkEmail(event.target.value)) {
            setErrors({ ...errors, [fieldName]: false })
        }

        if (fieldName === 'password' && checkPassword(event.target.value)) {
            setErrors({ ...errors, [fieldName]: false })
        }
    }

    const handleBlur = fieldName => () => {
        if (fieldName === 'email' && !checkEmail(form[fieldName])) {
            setErrors({ ...errors, [fieldName]: true })
        }

        if (fieldName === 'password' && !checkPassword(form[fieldName])) {
            setErrors({ ...errors, [fieldName]: true })
        }
    }

    const handleRegister = async () => {
        try {
            if (errors.email || errors.password) return

            const data = await request('/api/auth/register', 'POST', {
                ...form,
            })
            console.log(data)
        } catch (error) {}
    }

    const handleLogin = async () => {
        try {
            if (errors.email || errors.password) return

            const data = await request('/api/auth/login', 'POST', {
                ...form,
            })
            console.log(data)
        } catch (error) {}
    }

    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card variant="outlined" sx={{ maxWidth: 400 }}>
                    <form action="" onSubmit={event => event.preventDefault()}>
                        <CardHeader title={'Авторизация'} />
                        <CardContent>
                            <TextField
                                required
                                id="email-field"
                                label="email"
                                fullWidth
                                margin="dense"
                                value={form.email}
                                onChange={handleChangeField('email')}
                                error={errors.email}
                                helperText={
                                    errors.email && 'Некорректный email!'
                                }
                                onBlur={handleBlur('email')}
                            />
                            <FormControl
                                sx={{
                                    width: '100%',
                                    marginTop: '8px',
                                    marginBottom: '4px',
                                }}
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    password*
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    value={form.password}
                                    onChange={handleChangeField('password')}
                                    error={errors.password}
                                    onBlur={handleBlur('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleShowPassword}
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="password"
                                />
                                <Typography
                                    sx={{
                                        marginTop: '3px',
                                        marginRight: '14px',
                                        marginBottom: '0',
                                        marginLeft: '14px',
                                        fontSize: '0.75rem',
                                        color: '#d32f2f',
                                    }}
                                >
                                    {errors.password &&
                                        'Введите минимум 6 символов!'}
                                </Typography>
                            </FormControl>
                            {/*<TextField*/}
                            {/*    required*/}
                            {/*    id="password-field"*/}
                            {/*    label="password"*/}
                            {/*    fullWidth*/}
                            {/*    margin="dense"*/}
                            {/*    value={form.password}*/}
                            {/*    onChange={handleChangeField('password')}*/}
                            {/*    error={errors.password}*/}
                            {/*    helperText={*/}
                            {/*        errors.password &&*/}
                            {/*        'Введите минимум 6 символов!'*/}
                            {/*    }*/}
                            {/*    onBlur={handleBlur('password')}*/}
                            {/*/>*/}
                        </CardContent>
                        <CardActions sx={{ padding: '16px' }}>
                            <Button
                                variant="contained"
                                onClick={handleLogin}
                                disabled={isButtonDisabled}
                            >
                                Войти
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleRegister}
                                disabled={isButtonDisabled}
                            >
                                Зарегистрироваться
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </Box>
            <AuthMessage
                error={error}
                clearError={clearError}
                successMessage={successMessage}
                clearSuccessMessage={clearSuccessMessage}
            />
        </>
    )
}

export default Auth
