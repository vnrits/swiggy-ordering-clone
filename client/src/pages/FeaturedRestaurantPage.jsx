import { Button, Flex, HStack, Heading, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'; import LandingPageWrapper from '../components/LandingPageWrapper'
import axios from 'axios';
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';

const FeaturedRestaurantPage = () => {
  const toast = useToast()
  const [featuredRestaurantItems, setFeaturedRestaurantItems] = useState([])

  useEffect(() => {
    const getRestaurantData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getRestaurantData`)
        if (res.status === 200) {
          setFeaturedRestaurantItems(res.data.data)
        }
      } catch (err) {
        toast({
          title: "Sorry, couldn't get data",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
      });
      }
    }

    getRestaurantData()
  }, [])

  return (
    <LandingPageWrapper>
      <Navbar />
      <VStack mt="6rem" alignItems="flex-start">
        <Text fontSize="1.5rem" fontWeight="bold" mt="3rem">Top restaurant chains in Kolkata</Text>
        <HStack alignItems="flex-start" gap="2rem" flexWrap="wrap">
          {featuredRestaurantItems.map((item, index) => (
            <RestaurantCard item={item} index={index} />
          ))}
        </HStack>
      </VStack>

    </LandingPageWrapper>
  )
}

export default FeaturedRestaurantPage
