import { GoogleMap, LoadScript, Marker, useJsApiLoader, } from '@react-google-maps/api'
import React, { useCallback, useMemo } from "react";

import styles from "/src/styles/dashboard/dashboard.module.css";

const options = {
    zoomControl: false,
    fullscreenControl: false,
    /* zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER // 'right-center' ,
        // ...otherOptions
    } */
} as google.maps.MapOptions;

type Props = {
    latitude: number,
    longitude: number,
    height?: string;
}

function Map({ latitude, longitude, height }: Props) {
    console.log(latitude, longitude)
    const center = useMemo(() => ({ lat: latitude, lng: longitude }), []);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY // ,
        // ...otherOptions
    })

    /* return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerClassName={styles.mapContainer}
                mapContainerStyle={{ height: height ? height : "22.5rem" }}
                zoom={10}
                options={options}
                center={center}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    ) */

    const renderMap = () => {
        // wrapping to a function is useful in case you want to access `window.google`
        // to eg. setup options or create latLng object, it won't be available otherwise
        // feel free to render directly if you don't need that
        /* const onLoad = React.useCallback(
          function onLoad (mapInstance) {
            // do something with map Instance
          }
        ) */
        return <GoogleMap
            mapContainerClassName={styles.mapContainer}
            mapContainerStyle={{ height: height ? height : "22.5rem" }}
            zoom={10}
            options={options}
            center={center}
        >
            <Marker position={center} />
        </GoogleMap>
    }

    if (loadError) {
        return <div>O mapa não pôde ser carregado, nos desculpe.</div>
    }

    return isLoaded ? renderMap() : <div style={{ display: "flex", flex: 1, justifyContent: "space-between", alignItems: "center" }} className='spinner'></div>
}

export default React.memo(Map)