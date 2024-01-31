import React, { useState } from 'react'
import LandingPageWrapper from '../../components/LandingPageWrapper'
import { Button, Flex, HStack, Heading, Input, Text, VStack, useTheme, useToast } from '@chakra-ui/react'
import { NavLink, useNavigate } from 'react-router-dom'
import Login from './Login'
import axios from 'axios'

const Register = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const toast = useToast()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleRegistration = async (e) => {
        e.preventDefault()
        setLoading(true);

        if (!email || !firstName || !lastName) {
            toast({
                title: "Please fill all the fields!",
                variant: "left-accent",
                position: "top",
                isClosable: true,
                duration: 2000,
                status: "error",
            });
            setLoading(false);
        } else {
            //check valid email
            if (!email.includes("@")) {
                toast({
                    title: "Please enter a valid email!",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "error",
                });
                setLoading(false);
                return;
            }

            try {
                // check if user exists
                const check = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/check`, {
                    email: email,
                })
                if (check.data.status) {
                    setLoading(false);
                    toast({
                        title: "User already exists!",
                        variant: "left-accent",
                        position: "top",
                        isClosable: true,
                        duration: 2000,
                        status: "error",
                    });
                    navigate("/login");
                    return;
                }

                const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/register`, {
                    email: email,
                    firstName: firstName,
                    lastName: lastName
                })
                if (resp.status === 200) {
                    toast({
                        title: "Registration Successful!",
                        variant: "left-accent",
                        position: "top",
                        isClosable: true,
                        duration: 2000,
                        status: "success",
                    });
                    setLoading(false);
                    navigate("/login");
                }
            } catch (err) {
                toast({
                    title: "Something went wrong!",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "error",
                });
                setLoading(false);
                console.log(err);
            }
        }

    }
    return (
        <LandingPageWrapper>
            <Flex
                flexDir="column"
                width="50%"
                alignItems="center"
                justifyContent="center"
                gap="1rem"
            >
                <Heading> Register Page </Heading>
                <Flex className="login" flexDir="column" width="25rem" gap="1rem">
                    <form
                        onSubmit={handleRegistration}
                        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                    >
                        <Input
                            variant="unstyled"
                            type="text"
                            placeholder="First Name*"
                            p="0.8rem 1rem"
                            border={`1px solid ${theme.colors.border}`}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            variant="unstyled"
                            type="text"
                            placeholder="Last Name*"
                            p="0.8rem 1rem"
                            border={`1px solid ${theme.colors.border}`}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <Input
                            variant="unstyled"
                            type="email"
                            placeholder="Email*"
                            p="0.8rem 1rem"
                            border={`1px solid ${theme.colors.border}`}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            type="submit"
                            isLoading={loading}
                            loadingText="Please Wait..."
                            variant="unstyled"
                            gap="0.5rem"
                            backgroundColor="red.500"
                            border="2px solid transparent"
                            _hover={{
                                backgroundColor: "#fff",
                                color: "#e53e3e",
                                border: "2px solid #e53e3e"
                            }}
                            p="1.5rem"
                            display="flex"
                            color="#fff"
                            borderRadius="30px"
                        >
                            Register
                        </Button>
                    </form>
                    <Flex justifyContent="center" gap="0.5rem" pt="2rem">
                        <Text>Already have an account? </Text>
                        <Flex>
                            <NavLink to="/login" key={<Login />} className="link">
                                <Text color="#206bd1" fontWeight="500" textDecor="underline">
                                    Login
                                </Text>
                            </NavLink>{" "}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </LandingPageWrapper>
    )
}

export default Register
