import { Button, HStack, Text, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantCard from './RestaurantCard'

const FeaturedRestaurants = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [featuredRestaurantItems, setFeaturedRestaurantItems] = useState([])

  useEffect(() => {
    const getRestaurantData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getRestaurantData`)
        if(res.status === 200) {
          setFeaturedRestaurantItems(res.data.data)
        }
      } catch (err) {
        toast({
          title: "Couldn't fetch the data, try again later",
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
    <VStack flexWrap="wrap">
      <HStack w="full" justifyContent="space-between" mt="3rem">
        <Text fontSize="1.5rem" fontWeight="bold">Top restaurant chains in Kolkata</Text>
        <Button
          onClick={() => navigate("/restaurants")}
          bg="#fff"
          color="red"
          border="1px solid #d4d5d9"
          boxShadow="1px 1px 5px #d4d5d9"
          _hover={{ bg: "#f1f2f3" }}
        >
          See more
        </Button>
      </HStack>

      <HStack gap="2rem" flexWrap="wrap" alignItems="flex-start">
        {featuredRestaurantItems.map((item, index) => (
          <RestaurantCard index={index} item={item} />
        ))}
      </HStack>
      
    </VStack>
  )
}

export default FeaturedRestaurants
