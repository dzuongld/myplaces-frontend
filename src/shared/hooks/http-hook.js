import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpClient = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    // when component loads too fast, cancel updates on nonexisting compnent
    const activeHttpRequests = useRef([])

    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setLoading(true)

            // built in in browsers
            const httpAbortCtrl = new AbortController()
            activeHttpRequests.current.push(httpAbortCtrl)

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal,
                })

                // remove completed request
                activeHttpRequests.current = activeHttpRequests.current.filter(
                    (reqCtrl) => reqCtrl !== httpAbortCtrl
                )

                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                setLoading(false)
                return data
            } catch (error) {
                setLoading(false)
                setError(error.message)
                throw error // inform the component using the hook
            }
        },
        []
    )

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        // clean up before the next run
        return () => {
            activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort())
        }
    }, [])

    return { loading, error, sendRequest, clearError }
}
