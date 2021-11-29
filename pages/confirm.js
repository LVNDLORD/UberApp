import { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import Map from './components/Map'
import { useRouter } from 'next/dist/client/router'
import RideSelector from './components/RideSelector'
import Link from 'next/link'



const Confirm = () => {
    const router = useRouter()
    const { pickup, dropoff } = router.query //pickup and dropoff gets here from "confirm buttom" from input

    const [pickupCoordinates, SetPickupCoordinates] = useState([0, 0]);
    const [dropoffCoordinates, SetDropoffCoordinates] = useState([0, 0]);

    const getPickupCoordinates = (pickup) => {
        // const pickup = "Santa Monica";
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

    const getDropOffCoordinates = (dropoff) => {
        // const dropoff = "Los Angeles";
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` + // instead of ?access_token use URLSearchParams. ? - the browser knows its a create parameter
            new URLSearchParams({
                access_token: "pk.eyJ1IjoibXJza2lwZXI5NiIsImEiOiJja3dkdHJkbXYxMjg3MnZxa3ZoOWp2bml4In0.W6ExHMOj2xBD6kuRbQKOfQ",
                limit: 1
            })
        )
            .then(response => response.json())
            .then(data => {
                SetDropoffCoordinates(data.features[0].center);
            })
    }
    // using useEffect we can run anything in the beginning of the application. Like if we launch it for the first time
    useEffect(()=>{
        if(pickup && dropoff){
            getPickupCoordinates(pickup)
            getDropOffCoordinates(dropoff);
        }
    }, [pickup, dropoff])// whenever the pickup and dropoff changes (come from the search page into router.query on line 8). 
    // From there it comes into useEffect, and then into getPickup/getDropoff functions which is used in fetch function after all


    return (
        <Wrapper>
            <ButtonContainer>
                <Link href="/search" passHref>
                <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
                </ Link>
            </ButtonContainer>
            <Map
                pickupCoordinates={pickupCoordinates} // passing along this data into a Map component
                dropoffCoordinates={dropoffCoordinates}
            />
            <RideContainer>
                <RideSelector
                    pickupCoordinates={pickupCoordinates} // passing along this data into a rideselector to calculate ride time
                    dropoffCoordinates={dropoffCoordinates}
                />
                <ConfirmButtonContainer>
                    <ConfirmButton>
                        Confirm UberX
                    </ConfirmButton>
                </ConfirmButtonContainer>
            </RideContainer>
        </Wrapper>
    )
}

export default Confirm

const BackButton = tw.img`
h-full object-container cursor-pointer
`

const ButtonContainer = tw.div`
rounded-full absolute top-4 left-4 z-10 bg-white shadow-md
`

const ConfirmButton = tw.div`
bg-black text-white my-4 mx-4 text-center py-4 text-xl 
`
const ConfirmButtonContainer = tw.div`
border-t-2
`

const RideContainer = tw.div`
flex-1 flex flex-col h-1/2
`

const Wrapper = tw.div`
flex h-screen flex-col
`
