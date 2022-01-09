import { useCallback, useEffect, useState } from 'react'

const storageName = 'userData'

const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(
            storageName,
            JSON.stringify({ userId: id, token: jwtToken })
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
            login(authData.token, authData.userId)
            setReady(true)
        }
    }, [login])

    return { login, logout, token, userId, ready }
}

export default useAuth
