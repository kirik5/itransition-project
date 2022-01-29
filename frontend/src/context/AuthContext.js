import { createContext } from 'react'

const noop = () => {}

const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    email: null,
})

export default AuthContext
