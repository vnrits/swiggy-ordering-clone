import { Button, Flex, HStack, Heading, Image, TabIndicator, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'; import LandingPageWrapper from '../components/LandingPageWrapper';
import Navbar from '../components/Navbar';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import Order from '../components/Order';

const IndividualRestaurant = () => {
  const location = useLocation()
  const customData = location.state.data
  const { isOpen: isOpenLargeImageModal, onOpen: onOpenLargeImageModal, onClose: onCloseLargeImageModal } = useDisclosure()

  const [largeImage, setLargeImage] = useState('')

  const formatRestaurantName = (name) => {
    return name.replace(/-/g, ' ');
  }

  const handleLargeImageModal = (image) => {
    setLargeImage(image)
    onOpenLargeImageModal()
  }


  return (
    <LandingPageWrapper>
      <Navbar />

      <VStack mt="6rem" w="full">
        <VStack gap="2rem" w="full">

          <VStack
            w="full"
            p="1rem 2rem"
            borderRadius="10px"
            alignItems="flex-start">
            <Text><Link to="/">Home</Link> / {formatRestaurantName(customData.name)}</Text>

            <Flex flexDir="row" w="full" gap="0.5rem" cursor="pointer">
              <Flex h="full" w="60%">
                <Image src={customData.image1} alt={customData.name} onClick={() => handleLargeImageModal(customData.image1)} boxSize="100px" h="full" w="full" />
              </Flex>
              <Flex flexDir="row" w="40%" gap="0.5rem">
                <Flex flexDir="column" w="50%" gap="0.5rem">
                  <Image src={customData.image2} alt={customData.name} onClick={() => handleLargeImageModal(customData.image2)} boxSize="100px" w="full" h="full" />
                  <Image src={customData.image3} alt={customData.name} onClick={() => handleLargeImageModal(customData.image3)} boxSize="100px" w="full" h="full" />
                </Flex>
                <Flex flexDir="column" w="50%" gap="0.5rem">
                  <Image src={customData.image4} alt={customData.name} onClick={() => handleLargeImageModal(customData.image4)} boxSize="100px" w="full" h="full" />
                  <Image src={customData.image5} alt={customData.name} onClick={() => handleLargeImageModal(customData.image5)} boxSize="100px" w="full" h="full" />
                </Flex>
              </Flex>
            </Flex>

            <VStack w="full" alignItems="flex-start">
              <Text fontSize="2rem" fontWeight="500">{formatRestaurantName(customData.name)}</Text>
              <Text>{customData.location}</Text>
            </VStack>

            <Tabs position="relative" variant="unstyled">
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Menu</Tab>
                <Tab>Order Online</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="red.500"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel>
                  <VStack w="full" alignItems="flex-start" gap="1rem">

                    <VStack alignItems="flex-start">
                      <Text fontSize="1.2rem">Cuisines</Text>
                      <HStack flexWrap="wrap">
                        {customData.foodItems.map((item) => (
                          <Text
                            bg="#fff"
                            color="red"
                            p="0.4rem 1.2rem"
                            borderRadius="20px"
                            border="1px solid #d4d5d9"
                          >{item}</Text>
                        ))}
                      </HStack>
                    </VStack>

                    <VStack alignItems="flex-start" gap="0">
                      <Text fontSize="1.2rem">Average Cost</Text>
                      <Text> Rs. {customData.price}/- for two people (approx.)</Text>
                      <Text fontSize="0.9rem" color="#d4d4d4">Exclusive of applicable charges and taxes, if any</Text>
                      <Text>Cash and Card accepted</Text>
                      <Text>Digital payments accepted</Text>
                    </VStack>

                    <VStack alignItems="flex-start" gap="0">
                      <Text fontSize="1.2rem">Delivery Time</Text>
                      <Text>takes approximately {customData.deliveryTime} mins to reach the destination</Text>
                    </VStack>

                    <VStack alignItems="flex-start" gap="0">
                      <Text fontSize="1.2rem">Direction</Text>
                      <HStack>
                        <Text>Click here to visit the exact location </Text>
                        <Link to={customData.direction} target='_blank' style={{ color: "blue", textDecoration: "underline" }}>Direction</Link>
                      </HStack>
                    </VStack>

                    <VStack alignItems="flex-start" >
                      <Text fontSize="1.2rem">More Info</Text>
                      <HStack flexWrap="wrap">
                        {customData.moreInfo.map((item) => (
                          <Text
                            bg="#fff"
                            color="red"
                            p="0.4rem 1.2rem"
                            borderRadius="20px"
                            border="1px solid #d4d5d9">{item}</Text>
                        ))}</HStack>
                    </VStack>

                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack w="full" alignItems="flex-start">
                    <VStack alignItems="flex-start" ml="1rem">
                      <TableContainer>
                        <Table>
                          <Thead>
                            <Tr>
                              <Th>Food Name</Th>
                              <Th>Price</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {customData.foodMenu.map((item, index) => (
                              <Tr key={index}>
                                <Td>{item.label}</Td>
                                <Td>Rs. {item.price}/-</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </VStack>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <Order foodMenu={customData.foodMenu} />
                </TabPanel>
              </TabPanels>
            </Tabs>

          </VStack>
        </VStack>

      </VStack>

      <Modal isOpen={isOpenLargeImageModal} onClose={onCloseLargeImageModal} isCentered size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={largeImage} alt={customData.name} boxSize="100%" w="full" h="full" />
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </LandingPageWrapper >
  )
}

export default IndividualRestaurant
