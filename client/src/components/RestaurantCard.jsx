import React from 'react'
import { VStack, Text, Image, HStack, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ item, index }) => {
    const navigate = useNavigate()

    const formatRestaurantName = (name) => {
        return name.replace(/-/g, ' ')
    }

    const navigateWithData = (data, index) => {
        navigate(`/restaurants/${data.name}`, {
            state: { data: data, index: index }
        })
    }

    let wordsArray = []
    if(Array.isArray(item.foodItems)) {
        wordsArray = item.foodItems;
    } else if (typeof item.foodItems === 'string') {
        wordsArray = item.foodItems.split(', ');
    }

    return (
        <VStack
            onClick={() => navigateWithData(item, index)}
            key={index}
            w="18rem"
            p="0"
            borderRadius="15px"
            alignItems="flex-start"
            cursor="pointer">
            <Image
                src={item.image1}
                alt={item.name}
                boxSize="100px"
                h="full"
                w="full"
                borderRadius="15px"
            />
            <VStack alignItems="flex-start" gap="0" p="0 1rem">
                <Text>{formatRestaurantName(item.name)}</Text>
                <HStack></HStack>
                <Text fontWeight="bold">Rs. {item.price}/- (for two) </Text>
                <Text display="flex" flexWrap="wrap" gap="0">
                    {wordsArray.slice(0, 3).map((item) => (
                        <Text>{item} ,</Text>
                    ))}
                </Text>
            </VStack>
        </VStack>
    )
}

export default RestaurantCard
