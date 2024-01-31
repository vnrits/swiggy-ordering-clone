import React, { useContext, useState } from 'react'
import LandingPageWrapper from '../../components/LandingPageWrapper'
import { Button, Flex, HStack, Heading, Input, Text, VStack, useTheme, useToast } from '@chakra-ui/react'
import { NavLink, useNavigate } from 'react-router-dom'
import Register from './Register'
import { UserContext } from '../../utils/userContext'
import axios from 'axios'
import { magic } from '../../utils/magic'
import Cookies from 'js-cookie'

const Login = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const toast = useToast()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useContext(UserContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (email === "") {
      toast({
        title: "Please provide your email!",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "error",
      });
      setLoading(false)
      return;
    }

    try {
      // check if user exists or not
      const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/check`, {
        email: email
      })
      console.log(resp.data)

      if (!resp.data.status) {
        toast({
          title: "Please register first!",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
        setLoading(false)
        return navigate("/register");
      }

      // trigger magic link to be sent to user
      let didToken = await magic.auth.logWithMagicLink({
        email,
      })

      // validate didToken with server
      try {
        const loginResp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, {
          email: email,
        }, {
          headers: {
            Authorization: `Bearer ${didToken}`
          }
        })

        console.log(loginResp)
        if (loginResp.status === 200 && resp.data.admin === false) {
          let userMetaData = await magic.user.getInfo();
          setUser(userMetaData)
          Cookies.set("token", didToken);
          Cookies.set("admin", false)
          navigate("/")
        } else {
          let userMetadata = await magic.user.getInfo();
          setUser(userMetadata);
          Cookies.set("token", didToken);
          Cookies.set("admin", true);
          navigate("/admin/all-orders");
        }
      } catch (err) {
        toast({
          title: "Login attempt failed, please try again later!",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
        setLoading(false);
        console.log(err);
      }

    } catch (err) {
      toast({
        title: "Login attempt failed, please try again later!",
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
  return (
    <LandingPageWrapper>
      <VStack
        w="50%"
        alignItems="center"
        justifyContent="center"
        gap="1rem">
        <Heading>Log in.</Heading>
        <VStack
          w="25rem"
          gap="1rem">
          <form onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Input
              type="email"
              placeholder="Email*"
              variant="unstyled"
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
              Log In
            </Button>
          </form>
          <HStack justifyContent="center" pt="2rem">
            <Text>Not registered yet?</Text>
            <Flex>
              <NavLink to="/register" key={<Register />} className="link">
                <Text color="#206bd1" fontWeight="500" textDecor="underline">
                  Create account
                </Text>
              </NavLink>{" "}
            </Flex>
          </HStack>
        </VStack>
      </VStack>

    </LandingPageWrapper>
  )
}

export default Login
