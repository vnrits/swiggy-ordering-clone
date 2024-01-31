import { Heading, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
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
import Cookies from 'js-cookie'
import DashboardWrapper from '../../components/DashboardWrapper'

const Dashboard = () => {
  const [allOrders, setAllOrders] = useState([])

  useEffect(() => {
    const getYourOrders = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/getOrders`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        })
        if (res.status === 200) {
          setAllOrders(res.data.data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    getYourOrders()
  }, [])

  return (
    <DashboardWrapper>
      <VStack w="full" alignItems="flex-start">
        <Text fontSize="1.5rem" fontWeight="bold">Your Orders</Text>

        <TableContainer>
          <Table variant='striped' colorScheme='red'>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Order ID</Th>
                <Th isNumeric>Your Number</Th>
                <Th>Total Amount</Th>
                <Th>Order Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allOrders.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.date}</Td>
                  <Td>{item.order_id}</Td>
                  <Td isNumeric>{item.customer_number}</Td>
                  <Td>Rs. {item.total_amount}/-</Td>
                  <Td>{item.order_status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </DashboardWrapper>
  )
}

export default Dashboard
