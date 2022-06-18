import { GoogleMap, LoadScript, Marker, } from '@react-google-maps/api'
import React, { useCallback, useMemo } from "react";

import styles from "/src/styles/dashboard/dashboard.module.css";

const options = {
    zoomControl: false
    /* zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER // 'right-center' ,
        // ...otherOptions
    } */
}

function Map({ latitude, longitude }) {
    console.log(latitude, longitude)
    const center = useMemo(() => ({ lat: latitude, lng: longitude }), []);
    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerClassName={styles.mapContainer}
                zoom={10}
                options={options}
                center={center}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Map)