import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { useHttpClient } from '../../shared/hooks/http-hook'

import PlaceList from '../components/PlaceList'

const UserPlaces = (props) => {
    // picked up from route
    const userId = useParams().userId
    const [places, setPlaces] = useState()
    const { loading, error, sendRequest, clearError } = useHttpClient()

    useEffect(() => {
        const getPlaces = async () => {
            try {
                const url = process.env.REACT_APP_BACKEND_URL
                const data = await sendRequest(
                    url + '/api/places/user/' + userId
                )

                setPlaces(data.places)
            } catch (error) {
                console.log(error)
            }
        }
        getPlaces()
    }, [userId, sendRequest])

    const placeDeleteHandler = (placeId) => {
        setPlaces((prevPlaces) =>
            prevPlaces.filter((place) => place.id !== placeId)
        )
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {loading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!loading && places && (
                <PlaceList items={places} onDelete={placeDeleteHandler} />
            )}
        </React.Fragment>
    )
}

export default UserPlaces
