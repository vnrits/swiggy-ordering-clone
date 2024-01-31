import { Button, Flex, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Logout from './Logout'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <Flex width="100%" alignItems="center" justifyContent="center" mt="1rem" pos="fixed" zIndex="100">
      <Flex width={{ base: "full", xl: "1280px" }} borderRadius="5px" justifyContent="space-between" p="0.5rem 3rem" boxShadow="0 2px 3px #bebebe" backdropFilter="blur(8px)"></Flex>
      <Flex alignItems="center" gap="1rem">
        <Image src="" alt="Tasty-Hub" h="4rem" />
      </Flex>

      <Flex>
        {Cookies.get("token") ? (
          <HStack gap="1rem">
            <Button
              onClick={() => navigate(Cookies.get("admin") === "true" ? "/admin/all-orders" : "/private/dashboard")}
              backgroundColor="red.500"
              border="2px solid transparent"
              _hover={{
                backgroundColor: "#fff",
                color: "#e53e3e",
                border: "2px solid #e53e3e"
              }}
              variant="unstyled"
              p="1.5rem"
              display="flex"
              color="#fff"
              borderRadius="30px">Dashboard</Button>

              <Logout />

          </HStack>
        ) : (
          <HStack gap="1rem">
            <Button onClick={() => navigate("/login")}
              backgroundColor="red.500"
              border="2px solid transparent"
              _hover={{
                backgroundColor: "#fff",
                color: "#e53e3e",
                border: "2px solid #e53e3e"
              }}
              variant="unstyled"
              p="1.5rem"
              display="flex"
              color="#fff"
              borderRadius="30px">Login</Button>

            <Button
              onClick={() => navigate("/register")}
              backgroundColor="red.500"
              border="2px solid transparent"
              _hover={{
                backgroundColor: "#fff",
                color: "#e53e3e",
                border: "2px solid #e53e3e"
              }}
              variant="unstyled"
              p="1.5rem"
              display="flex"
              color="#fff"
              borderRadius="30px">Register</Button>
          </HStack>
        )}
      </Flex>

    </Flex>
  )
}

export default Navbar
