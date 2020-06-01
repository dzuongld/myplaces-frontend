import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

import './Map.css'

const Map = (props) => {
    const { center, zoom } = props
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API

    const mapRef = useRef(null)

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [center.lng, center.lat],
            zoom: zoom,
        })
        new mapboxgl.Marker().setLngLat([center.lng, center.lat]).addTo(map)
    }, [center, zoom])

    return (
        <div
            ref={mapRef}
            className={`mapContainer ${props.className}`}
            style={props.style}
        ></div>
    )
}

export default Map
