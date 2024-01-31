import { Button, Checkbox, Heading, Image, Input, Select, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import DashboardWrapper from "../../components/DashboardWrapper"

const AllRestaurants = () => {
  const toast = useToast()

  const [allRestaurants, setAllRestaurants] = useState([])

  useEffect(() => {
    const getAllUserOrders = async () => {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getRestaurantData`)
      if (res.status === 200) {
        setAllRestaurants(res.data.data)
      }
    }
    getAllUserOrders()

  }, [])


  return (
    <DashboardWrapper>
      <VStack w="full" alignItems="flex-start">
        <Text fontSize="1.5rem" fontWeight="bold">All Listed Restaurants </Text>

        <VStack>

        </VStack>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Restaurant ID</Th>
                <Th>Online Delivery</Th>
                <Th isNumeric>Price for 2</Th>
                <Th>Total Food Menu</Th>
                <Th>Direction</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allRestaurants.map((item, index) => (
                <Tr key={index}>
                  <Td isNumeric>
                    <Image src={item.image1} h="3rem" borderRadius="5px" />
                  </Td>
                  <Td>{item._id}</Td>
                  <Td>{item.onlineDelivery ? "True" : "False"}</Td>
                  <Td>Rs. {item.price}</Td>
                  <Td>{item.foodMenu.length}</Td>
                  <Td> <Link to={item.direction} target='_blank'>Visit</Link></Td>
                </Tr>
              ))}

            </Tbody>

          </Table>
        </TableContainer>


      </VStack>

    </DashboardWrapper>
  )
}

export default AllRestaurants
