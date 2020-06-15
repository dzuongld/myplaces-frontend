import { useCallback, useEffect, useState } from 'react'

let logoutTimer // general variable to manage time

export const useAuth = () => {
    const [token, setToken] = useState()
    const [tokenExpireDate, setTokenExpireDate] = useState()
    const [userId, setUserId] = useState('')

    const login = useCallback((userId, token, expirationDate) => {
        setToken(token)
        setUserId(userId)

        // 1h from now
        const tokenExpirationDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)

        setTokenExpireDate(tokenExpirationDate)
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId,
                token,
                expire: tokenExpirationDate.toISOString(), // ensure no data is lost
            })
        )
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setTokenExpireDate(null)
        setUserId('')
        localStorage.removeItem('userData')
    }, [])

    useEffect(() => {
        if (token && tokenExpireDate) {
            const remainingTime =
                tokenExpireDate.getTime() - new Date().getTime()
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer)
        }
    }, [token, logout, tokenExpireDate])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))

        // auto login only if token is not expired
        if (data && data.token && new Date(data.expire) > new Date()) {
            login(data.userId, data.token, new Date(data.expire))
        }
    }, [login])

    return { token, userId, login, logout }
}
