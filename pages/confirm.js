import { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import Map from './components/Map'
import Link from 'next/link'

const Confirm = () => {

    const [pickupCoordinates, SetPickupCoordinates] = useState();
    const [dropoffCoordinates, SetDropoffCoordinates] = useState();

    const getPickupCoordinates = () => {
        const pickup = "Santa Monica";
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` + // instead of ?access_token use URLSearchParams. ? - the browser knows its a create parameter
            new URLSearchParams({
                access_token: "pk.eyJ1IjoibXJza2lwZXI5NiIsImEiOiJja3dkdHJkbXYxMjg3MnZxa3ZoOWp2bml4In0.W6ExHMOj2xBD6kuRbQKOfQ",
                limit: 1
            })
        )
            .then(response => response.json())
            .then(data => {
                // console.log(data.features[0].center);
                SetPickupCoordinates(data.features[0].center);
            })
    }

    const getDropOffCoordinates = () => {
        const dropoff = "Los Angeles";
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` + // instead of ?access_token use URLSearchParams. ? - the browser knows its a create parameter
            new URLSearchParams({
                access_token: "pk.eyJ1IjoibXJza2lwZXI5NiIsImEiOiJja3dkdHJkbXYxMjg3MnZxa3ZoOWp2bml4In0.W6ExHMOj2xBD6kuRbQKOfQ",
                limit: 1
            })
        )
            .then(response => response.json())
            .then(data => {
                // console.log("DropOff");
                // console.log(data.features[0].center);
                SetDropoffCoordinates(data.features[0].center);
            })
    }
    // using useEffect we can run anything in the beginning of the application. Like if we launch it for the first time
    useEffect(() => {
        getPickupCoordinates();
        getDropOffCoordinates();

    }, [])


    return (
        <Wrapper>
            <Map
                pickupCoordinates={pickupCoordinates} // passing along this data into a Map component
                dropoffCoordinates={dropoffCoordinates}
            />
            <RideContainer>
                Ride Selector Confirm Button
                {pickupCoordinates}
                {dropoffCoordinates}
            </RideContainer>
        </Wrapper>
    )
}

export default Confirm

const RideContainer = tw.div`
flex-1`

const Wrapper = tw.div`
flex h-screen flex-col
`
