import { useCallback, useEffect, useState } from 'react'

const storageName = 'userData'

const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [ready, setReady] = useState(false)
    const [email, setEmail] = useState(null)

    const login = useCallback((jwtToken, id, mail) => {
        setToken(jwtToken)
        setUserId(id)
        setEmail(mail)

        localStorage.setItem(
            storageName,
            JSON.stringify({ userId: id, token: jwtToken, email: mail })
        )
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem(storageName))

        if (authData && authData.token) {
            login(authData.token, authData.userId, authData.email)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, email, ready }
}

export default useAuth
