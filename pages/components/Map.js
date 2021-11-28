import React from "react";
import { useEffect } from 'react'
import tw from 'tailwind-styled-components'
import mapboxgl from '!mapbox-gl'


mapboxgl.accessToken = 'pk.eyJ1IjoibXJza2lwZXI5NiIsImEiOiJja3dkdHJkbXYxMjg3MnZxa3ZoOWp2bml4In0.W6ExHMOj2xBD6kuRbQKOfQ';

const Map = (props) => {
    // console.log(props);

    useEffect(() => {  // this useEffect initializes a map
        
        const map = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-99.29011, 39.39172],
            zoom: 3,
        });

        if (props.pickupCoordinates) {
            addToMap(map, props.pickupCoordinates); //pickup marker on the map
        }

        if (props.dropoffCoordinates) {
            addToMap(map, props.dropoffCoordinates); // dropoff marker on the map in confirm page
        }

        if ( props.pickupCoordinates && props.dropoffCoordinates) {
            map.fitBounds([ // autozoom to coordinates
                props.dropoffCoordinates,
                props.pickupCoordinates
            ], {
                padding: 70
            });
        }
    }, [props.pickupCoordinates, props.dropoffCoordinates]); // this useEffect waits for both coordinates
    // when you see the actual coordinate vales change - run them again

    const addToMap = (map, coordinates) => {
        const marker1 = new mapboxgl.Marker({ color: 'black' })
            .setLngLat(coordinates)
            .addTo(map);
    }


    return <Wrapper id='map'>
        
    </Wrapper >
}

export default Map

const Wrapper = tw.div`
flex-1 h-1/2
`
