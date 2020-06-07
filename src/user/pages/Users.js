import React, { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { useHttpClient } from '../../shared/hooks/http-hook'

const Users = () => {
    const [users, setUsers] = useState()
    const { loading, error, sendRequest, clearError } = useHttpClient()

    // should not use async in useeffect
    // declare an inside function and execute instead
    useEffect(() => {
        const getUsers = async () => {
            try {
                const url = process.env.REACT_APP_BACKEND_URL
                const data = await sendRequest(url + '/api/users')
                setUsers(data.users)
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    }, [sendRequest])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {loading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!loading && users && <UsersList items={users} />}
        </React.Fragment>
    )
}

export default Users
