import { Button, Checkbox, Heading, Input, Select, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import DashboardWrapper from '../../components/DashboardWrapper'

const AllOrders = () => {
  const toast = useToast();
  const [allOrders, setAllOrders] = useState([])
  const { isOpen: isOpenOrderStatus, onOpen: onOpenOrderStatus, onClose: onCloseOrderStatus } = useDisclosure()

  const [orderStatus, setOrderStatus] = useState([
    { id: 1, name: 'Pending' },
    { id: 2, name: 'Confirmed' },
    { id: 3, name: 'Dispatched' },
    { id: 4, name: 'Delivered' },
  ])
  const [selectedStatus, setSelectedStatus] = useState('')

  const [getOrderId, setGetOrderId] = useState('')
  const [getUserEmail, setGetUserEmail] = useState('')
  const handleOpenStatusUpdateModal = (id, user_email) => {
    setGetOrderId(id)
    setGetUserEmail(user_email)

    onOpenOrderStatus();
  }

  useEffect(() => {
    const getAllUserOrders = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getAdminOrders`)
        if (res.status === 200) {
          setAllOrders(res.data.data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    getAllUserOrders()
  }, [])

  const handleUpdateOrderStatus = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/updateOrderStatus`, {
        order_id: getOrderId,
        user_email: getUserEmail,
        order_status: selectedStatus,
      })
      if (res.status === 200) {
        onCloseOrderStatus()
        toast({
          title: "Order Status Updated",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "success",
        });
      }
    } catch (err) {
      onCloseOrderStatus()
      toast({
        title: "Error in Updating Order Status",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "error",
      });
    }
  }

  return (
    <DashboardWrapper>
      <VStack w="full" alignItems="flex-start">
        <Text fontSize="1.5rem" fontWeight="bold">All Orders Page</Text>

        <VStack>
          <TableContainer>
            <Table><Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>Customer Address</Th>
                <Th isNumeric>Customer Number</Th>
                <Th>Customer Email-ID</Th>
                <Th>Order Status</Th>
                <Th>Edit Status</Th>
              </Tr>
            </Thead>

              <Tbody>
                {allOrders.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.order_id}</Td>
                    <Td>{item.customer_address}</Td>
                    <Td isNumeric>{item.customer_number}</Td>
                    <Td>{item.user_email}</Td>
                    <Td>{item.order_status}</Td>
                    <Td>
                      <Button
                        onClick={() => handleOpenStatusUpdateModal(item.order_id, item.user_email)}
                        bg="#fff"
                        color="red"
                        border="1px solid #d4d5d9"
                        boxShadow="1px 1px 5px #d4d5d9"
                        _hover={{ bg: "#f1f2f3" }}
                      >Change</Button></Td>
                  </Tr>
                ))}
              </Tbody>

            </Table>
          </TableContainer>
        </VStack>

        <Modal isOpen={isOpenOrderStatus} onClose={onCloseOrderStatus} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change Order Status</ModalHeader>
            <ModalCloseButton />
            <ModalBody mb="1rem">
              <VStack gap="1rem">

                <Select placeholder='Select option'
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}>
                  {orderStatus.map((item, index) => (
                    <option key={index} value={item.name} onClick={() => setOrderStatus()}>{item.name}</option>
                  ))}
                </Select>
                <Button
                  onClick={handleUpdateOrderStatus}
                  bg="#fff"
                  color="red"
                  border="1px solid #d4d5d9"
                  boxShadow="1px 1px 5px #d4d5d9"
                  _hover={{ bg: "#f1f2f3" }}
                >Update Status</Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>

      </VStack>

    </DashboardWrapper>
  )
}

export default AllOrders
