import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {
    const USERS = [
        {
            id: '1',
            image: 'https://randomuser.me/api/portraits/women/77.jpg',
            name: 'An',
            places: 3,
        },
        {
            id: '2',
            image: 'https://randomuser.me/api/portraits/men/85.jpg',
            name: 'Binh',
            places: 8,
        },
        {
            id: '3',
            image: 'https://randomuser.me/api/portraits/women/12.jpg',
            name: 'Chi',
            places: 5,
        },
    ]

    return <UsersList items={USERS} />
}

export default Users
