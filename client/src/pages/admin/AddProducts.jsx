import { Button, Checkbox, HStack, Input, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import DashboardWrapper from '../../components/DashboardWrapper'

const AddProducts = () => {
  const toast = useToast();
  const [name, setName] = useState('')
  const [foodItems, setFoodItems] = useState([])
  const [deliveryTime, setDeliveryTime] = useState('')
  const [onlineDelivery, setOnlineDelivery] = useState(false)
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [image5, setImage5] = useState('')
  const [direction, setDirection] = useState('')
  const [location, setLocation] = useState('')
  const [moreInfo, setMoreInfo] = useState([])
  const [foodMenu, setFoodMenu] = useState([])
  const [foodMenuName, setFoodMenuName] = useState('')
  const [foodMenuPrice, setFoodMenuPrice] = useState('')
  const { isOpen: isOpenFoodMenu, onOpen: onOpenFoodMenu, onClose: onCloseFoodMenu } = useDisclosure()


  const handleChangeFoodItems = (e) => {
    const itemsString = e.target.value
    const itemsArray = itemsString.split(',').map((item) => item.trim())
    setFoodItems(itemsArray)
  }

  const handleChangeMoreInfo = (e) => {
    const itemsString = e.target.value
    const itemsArray = itemsString.split(',').map((item) => item.trim())
    setMoreInfo(itemsArray)
  }

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomValue = Math.random();
    const uniqueId = String(timestamp) + String(randomValue);

    return uniqueId;
  }

  const convertToTitleCase = (inputString) => {
    const words = inputString.split('-')
    const titleCaseWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    const titleCaseString = titleCaseWords.join(' ');

    return titleCaseString;
  }

  const handleAddFoodMenu = () => {
    const convertedLabel = convertToTitleCase(foodMenuName);

    const addNewFoodMenu = {
      id: generateUniqueId(),
      label: convertedLabel,
      price: foodMenuPrice,
      value: foodMenuName
    }

    setFoodMenu([...foodMenu, addNewFoodMenu])
    setFoodMenuName('')
    setFoodMenuPrice(0)
  }

  const handleDeleteMenuItem = (id) => {
    const newFoodMenu = foodMenu.filter(item => item.id !== id);
    setFoodMenu(newFoodMenu);
  }

  const handleSaveData = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/saveRestaurantData`, {
        name,
        foodItems,
        deliveryTime,
        onlineDelivery,
        price,
        rating,
        image1,
        image2,
        image3,
        image4,
        image5,
        location,
        direction,
        moreInfo,
        foodMenu
      })
      if (res.status === 200) {
        toast({
          title: "Restaurant data added successfully",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "success",
        });

        setName('');
        setFoodItems([]);
        setDeliveryTime('');
        setOnlineDelivery(false);
        setPrice('');
        setRating(0);
        setImage1('');
        setImage2('');
        setImage3('');
        setImage4('');
        setImage5('');
        setLocation('');
        setDirection('');
        setMoreInfo([]);
        setFoodMenu([]);
      }
    } catch (err) {
      toast({
        title: "Error in adding the restaurant data",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "success",
      });
    }
  }

  return (
    <DashboardWrapper>
      <VStack w="full" alignItems="flex-start">
        <Text fontSize="1.5rem" fontWeight="bold">Add Restaurant Details</Text>

        <VStack w="50rem">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <Input
            type='text'
            value={foodItems.join(', ')}
            onChange={handleChangeFoodItems}
            placeholder='Food Items (seperate with commas)'
          />
          <Input
            type='number'
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            placeholder='Delivery Time'
          />
          <Checkbox
            type="checkbox"
            borderRadius="50%"
            size='lg'
            colorScheme="red"
            onChange={(e) => setOnlineDelivery(e.target.checked ? 1 : 0)}
          >
            Online Delivery
          </Checkbox>
          <Input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Price for 2 people'
          />
          <Input
            type='number'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <Input
            type='text'
            value={image1}
            onChange={(e) => setImage1(e.target.value)}
            placeholder='Image Link 1 ...'
          />
          <Input
            type='text'
            value={image2}
            onChange={(e) => setImage2(e.target.value)}
            placeholder='Image Link 2 ...'
          />
          <Input
            type='text'
            value={image3}
            onChange={(e) => setImage3(e.target.value)}
            placeholder='Image Link 3 ...'
          />
          <Input
            type='text'
            value={image4}
            onChange={(e) => setImage4(e.target.value)}
            placeholder='Image Link 4 ...'
          />
          <Input
            type='text'
            value={image5}
            onChange={(e) => setImage5(e.target.value)}
            placeholder='Image Link 5 ...'
          />
          <Input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Location'
          />
          <Input
            type='text'
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            placeholder='Direction' />
          <Input
            type='text'
            value={moreInfo.join(', ')}
            onChange={handleChangeMoreInfo}
            placeholder='More Info (seperate with commas)'
          />

          <HStack w="full">
            <Input type='text' value={foodMenuName} onChange={(e) => setFoodMenuName(e.target.value)} placeholder='Food Name' />
            <Input type='number' value={foodMenuPrice} onChange={(e) => setFoodMenuPrice(e.target.value)} />

            <VStack>
              <Button
                onClick={handleAddFoodMenu}
                bg="#fff"
                color="red"
                border="1px solid #d4d5d9"
                boxShadow="1px 1px 5px #d4d5d9"
                _hover={{ bg: "#f1f2f3" }}
              >Add</Button>
            </VStack>
            <VStack>
              {foodMenu.length > 0 && (
                <Button
                  onClick={onOpenFoodMenu}
                  bg="#fff"
                  color="red"
                  border="1px solid #d4d5d9"
                  boxShadow="1px 1px 5px #d4d5d9"
                  _hover={{ bg: "#f1f2f3" }}
                >Check Food Menu</Button>
              )}
            </VStack>
          </HStack>
        </VStack>

        <Button
          onClick={handleSaveData}
          bg="#fff"
          color="red"
          border="1px solid #d4d5d9"
          boxShadow="1px 1px 5px #d4d5d9"
          _hover={{ bg: "#f1f2f3" }}
        >Save</Button>

        <Modal isOpen={isOpenFoodMenu} onClose={onCloseFoodMenu} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Food Menu</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack gap="1rem" mb="1rem" w="full" >
                {foodMenu.map((item, index) => (
                  <HStack key={index} justifyContent="space-between" w="full">
                    <Text>{item.label} - Rs. {item.price} /-</Text>
                    <Button
                      onClick={() => handleDeleteMenuItem(item.id)}
                      bg="#fff"
                      color="red"
                      border="1px solid #d4d5d9"
                      boxShadow="1px 1px 5px #d4d5d9"
                      _hover={{ bg: "#f1f2f3" }}
                    >Delete</Button>
                  </HStack>
                ))}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>

      </VStack>

    </DashboardWrapper>
  )
}

export default AddProducts