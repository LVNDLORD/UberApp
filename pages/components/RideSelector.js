
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import { carList } from '../data/carList'

const RideSelector = ({ pickupCoordinates, dropoffCoordinates }) => {
    const [rideDuration, setRideDuration] = useState(0); // calculating the price
    // taking the number of seconds from pickup to dropoff and multiply by multiplier

    //eslintreact-hooks/exhaustive-deps
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        rideDuration = fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]}, ${pickupCoordinates[1]}; ${dropoffCoordinates[0]}, ${dropoffCoordinates[1]}
        ?access_token=pk.eyJ1IjoibXJza2lwZXI5NiIsImEiOiJja3dkdHJkbXYxMjg3MnZxa3ZoOWp2bml4In0.W6ExHMOj2xBD6kuRbQKOfQ`)
            .then((res => res.json()))// whatever the response is get the json file
            .then(data => {

                setRideDuration(data.routes[0].duration / 100)
                // route 0 to pick the first one give by api.
            })

    }, [pickupCoordinates, dropoffCoordinates]);// <= if we dont put these and coordinates change, the page will not show the updated version. Thats why we put dependency array
    //first arg - anonymous function, second - dependencies 
    return (
        <Wrapper>
            <Title>Choose a ride, or swipe up for more</Title>
            <CarList>
                {carList.map((car, index) => ( // looping over array with car objects. "car" is each object from carList
                    <Car key={index}>
                        <CarImage src={car.imgUrl} />
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>5 min away</Time>
                        </CarDetails>
                        <Price>{'€' + (rideDuration * car.multiplier).toFixed(2)}</Price>
                    </Car>
                ))}

            </CarList>

        </Wrapper>
    )
}
//
export default RideSelector

const CarDetails = tw.div`
flex-1
`
const Service = tw.div`
font-medium 
`
const Time = tw.div`
text-xs text-blue-500
`
const Price = tw.div`
text-sm
`
const CarImage = tw.img`
h-14 mr-2
`

const Car = tw.div`
flex p-4 items-center
`

const Title = tw.div`
text-gray-500 text-center text-xs py-2 border-b
`
const CarList = tw.div`
overflow-y-scroll

`
const Wrapper = tw.div`
flex flex-1 overflow-y-scroll flex-col 
`
// to keep "choose ride" on the top flex flex-col in wrapper

