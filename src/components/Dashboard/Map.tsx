import { GoogleMap, useJsApiLoader, Marker, } from '@react-google-maps/api'
import { useCallback, useMemo } from "react";

import styles from "/src/styles/dashboard.module.css";

const options = {
    zoomControl: false
    /* zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER // 'right-center' ,
        // ...otherOptions
    } */
}

export default function Map() {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.MAPS_API_KEY // ,
        // ...otherOptions
    })

    const renderMap = () => {
        return <GoogleMap
            mapContainerClassName={styles.mapContainer}
            zoom={10}
            options={options}
            center={center}
        >
            <Marker position={center} />
        </GoogleMap>
    }

    if (loadError) {
        return <div>O mapa não pôde ser carregado. Pedimos desculpas.</div>
    }

    return isLoaded ? renderMap() : null
}