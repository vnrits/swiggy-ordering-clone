import { Button, Flex, HStack, Input, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select';

const Order = ({ foodMenu }) => {
    const navigate = useNavigate()
    const toast = useToast()

    const [userAddress, setUserAddress] = useState("")
    const [userNumber, setUserNumber] = useState(0)
    const [selectedFoodItems, setSelectedFoodItems] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        let total = 0
        selectedFoodItems.forEach((item) => {
            total += item.price
        })
        setTotalAmount(total)
    }, [selectedFoodItems])

    const generateUniqueId = () => {
        const timestamp = Date.now();
        const randomValue = Math.random()
        const uniqueId = String(timestamp) + String(randomValue)

        return uniqueId
    }

    const handleOrder = async () => {
        if (Cookies.get("token")) {
            if (userAddress === "" || userNumber === 0 || selectedFoodItems.length === 0) {
                toast({
                    title: "Please fill the details first!",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "warning",
                });
                return;
            }

            try {
                const id = generateUniqueId()
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/postOrders`, {
                    order_id: id,
                    order_items: selectedFoodItems,
                    total_amount: totalAmount,
                    customer_address: userAddress,
                    customer_number: userNumber,
                    order_status: "pending",
                }, {
                    headers: {
                        "Authorization": "Bearer " + Cookies.get("token")
                    }
                })
                if (res.status === 200) {
                    toast({
                        title: "Order Placed Successfully!",
                        variant: "left-accent",
                        position: "top",
                        isClosable: true,
                        duration: 2000,
                        status: "success",
                    });
                }

            } catch (err) {
                toast({
                    title: "Sorry, couldn't place the order",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "error",
                });
            }
        } else {
            navigate("/login")
            toast({
                title: "Please login first!",
                variant: "left-accent",
                position: "top",
                isClosable: true,
                duration: 2000,
                status: "warning",
            });
        }
    }

    return (
        <Flex>
            <VStack gap="1rem" mb="1rem" w="full" alignItems="flex-start">
                <Input type="text" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} placeholder='Type your address here...' />
                <Input type="number" value={userNumber} onChange={(e) => setUserNumber(e.target.value)} />

                <Select
                    isSearchable
                    isMulti
                    defaultValue={foodMenu[0].value}
                    options={foodMenu}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            width: "25rem",
                        }),

                    }}
                    onChange={(item) => setSelectedFoodItems(item)}
                />

                <HStack justifyContent="space-between" w="full">
                    <Text>Total Amount</Text>
                    <Text>Rs. {totalAmount}</Text>
                </HStack>
                <Text>* We only accept Cash On Delivery (COD)</Text>

                <Button
                    onClick={handleOrder}
                    bg="#fff"
                    color="red"
                    border="1px solid #d4d5d9"
                    boxShadow="1px 1px 5px #d4d5d9"
                    _hover={{ bg: "#f1f2f3" }}
                >Place Order</Button>

            </VStack>

        </Flex>
    )
}

export default Order
