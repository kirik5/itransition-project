import { useCallback, useState } from 'react'

const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const clearError = () => setError(null)
    const clearSuccessMessage = () => setSuccessMessage(null)

    const request = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setLoading(true)

            try {
                if (body) {
                    body = JSON.stringify(body)
                    headers['Content-Type'] = 'application/json'
                }

                const response = await fetch(url, { method, body, headers })
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong!!!')
                }

                setSuccessMessage(data.message)

                return data
            } catch (error) {
                setError(error.message)
                throw error
            } finally {
                setLoading(false)
            }
        },
        []
    )

    const requestImg = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setLoading(true)

            try {
                const response = await fetch(url, { method, body, headers })
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong!!!')
                }

                setSuccessMessage(data.message)

                return data
            } catch (error) {
                setError(error.message)
                throw error
            } finally {
                setLoading(false)
            }
        },
        []
    )

    return {
        loading,
        request,
        requestImg,
        error,
        clearError,
        successMessage,
        clearSuccessMessage,
    }
}

export default useHttp
