import React from 'react'
import LandingPageWrapper from '../components/LandingPageWrapper'
import Navbar from '../components/Navbar'
import { Divider, VStack } from '@chakra-ui/react'
import FeaturedRestaurants from '../components/FeaturedRestaurants'
import OnlineDelivery from '../components/OnlineDelivery'

const LandingPage = () => {
    return (
        <LandingPageWrapper>
            <Navbar />
            <VStack mt="6rem">
                <FeaturedRestaurants />
                <Divider m="3rem 0" />
                <OnlineDelivery />
            </VStack>
        </LandingPageWrapper>
    )
}

export default LandingPage
