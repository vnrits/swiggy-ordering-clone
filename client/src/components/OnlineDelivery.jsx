import { Button, VStack, Heading, Text, HStack, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';

const OnlineDelivery = () => {
  const navigate = useNavigate()
  const [featuredRestaurantItems, setFeaturedRestaurantItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setFilteredItems(featuredRestaurantItems)
  }, [featuredRestaurantItems])

  useEffect(() => {
    const getRestaurantData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getRestaurantData`)
        if (res.status === 200) {
          setFeaturedRestaurantItems(res.data.data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    getRestaurantData()
  }, [])

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query)

    const filtered = featuredRestaurantItems.filter((item) => {
      return item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.foodItems.some((foodItem) => foodItem.toLowerCase().includes(query))
    })
    setFilteredItems(filtered)

  }

  const filterByOnlineDelivery = (restaurant) => {
    return restaurant.onlineDelivery === true;
  }

  // Functions to filter items based on user input :
  const filterByPriceRange = () => {
    const filtered = featuredRestaurantItems.filter(item => item.price >= 300 && item.price <= 500)
    setFilteredItems(filtered)
  }

  const filterByLessThan300 = () => {
    const filtered = featuredRestaurantItems.filter(item => item.price <= 300)
    setFilteredItems(filtered)
  }

  const filterByGreaterThan500 = () => {
    const filtered = featuredRestaurantItems.filter(item => item.price >= 500)
    setFilteredItems(filtered)
  }

  const filterByRating = () => {
    const filtered = featuredRestaurantItems.filter(item => item.rating >= 4.0)
    setFilteredItems(filtered)
  }

  const filterByOffer = () => { }

  const resetFilter = () => {
    setSearchQuery("")
    setFilteredItems(featuredRestaurantItems)
  }


  return (
    <VStack flexWrap="wrap" w="full" alignItems="flex-start">
      <Text fontSize="1.5rem" fontWeight="bold">Restaurants with online food delivery</Text>

      <HStack justifyContent="space-between" w="full" alignItems="flex-start" gap="6rem" m="1rem 0">
        <VStack gap="1rem">
          <Input
            type="text"
            placeholder="Search by name, location or food item..."
            value={searchQuery}
            onChange={handleSearch}
            outline="none"
            _focus={{ border: "1px solid red", outline: "none" }}
          />

          <HStack flexWrap="wrap">
            <Button
              onClick={filterByRating}
              bg="#fff"
              color="#333"
              border="1px solid #d4d5d9"
              boxShadow="1px 1px 5px #d4d5d9"
              borderRadius="20px"
              _hover={{ bg: "#f1f2f3" }}
            >Ratings 4.0+</Button>
            <Button
              onClick={filterByOffer}
              bg="#fff"
              color="#333"
              border="1px solid #d4d5d9"
              boxShadow="1px 1px 5px #d4d5d9"
              borderRadius="20px"
              _hover={{ bg: "#f1f2f3" }}
            >Offers</Button>
            <Button
              onClick={filterByPriceRange}
              bg="#fff"
              color="#333"
              border="1px solid #d4d5d9"
              boxShadow="1px 1px 5px #d4d5d9"
              borderRadius="20px"
              _hover={{ bg: "#f1f2f3" }}
            >Filter by Price (Rs.300 - Rs.500)</Button>
            <Button
              onClick={filterByLessThan300}
              bg="#fff"
              color="#333"
              border="1px solid #d4d5d9"
              boxShadow="1px 1px 5px #d4d5d9"
              borderRadius="20px"
              _hover={{ bg: "#f1f2f3" }}
            >Filter by less than Rs.300</Button>
            <Button
              onClick={filterByGreaterThan500}
              bg="#fff"
              color="#333"
              border="1px solid #d4d5d9"
              boxShadow="1px 1px 5px #d4d5d9"
              borderRadius="20px"
              _hover={{ bg: "#f1f2f3" }}
            >Filter by greater than Rs.500</Button>
            <Button
              onClick={resetFilter}
              bg="#fff"
              color="#333"
              border="1px solid #d4d5d9"
              boxShadow="1px 1px 5px #d4d5d9"
              borderRadius="20px"
              _hover={{ bg: "#f1f2f3" }}
            >Reset Filter</Button>
          </HStack>

        </VStack>
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
        {filteredItems.filter(filterByOnlineDelivery)?.map((item, index) => (
          <RestaurantCard item={item} index={index} />
        ))}
      </HStack>

    </VStack>
  )
}

export default OnlineDelivery
