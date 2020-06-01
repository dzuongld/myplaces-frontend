import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Trump Tower',
        description: "Orange-faced's residence",
        imageUrl:
            'https://i.insider.com/5d5b3aeacd9784667b78e332?width=1136&format=jpeg',
        address: '725 5th Ave, New York, NY 10022, United States',
        location: {
            lat: 40.7624284,
            lng: -73.9759827,
        },
        creator: '1',
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'Historical landmark',
        imageUrl:
            'https://cropper.watch.aetnd.com/public-content-aetn.video.aetnd.com/video-thumbnails/AETN-History_VMS/21/202/tdih-may01-HD.jpg?w=1440',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531,
        },
        creator: '2',
    },
]

const UserPlaces = (props) => {
    // picked up from route
    const userId = useParams().userId
    const places = DUMMY_PLACES.filter((place) => place.creator === userId)

    return <PlaceList items={places} />
}

export default UserPlaces
