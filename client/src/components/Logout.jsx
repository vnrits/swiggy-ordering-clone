import { Button, Flex } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../utils/userContext'
import { magic } from '../utils/magic'

const Logout = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [user, setUser] = useContext(UserContext)

  const handleLogoutBtn = () => {
    magic.user.logout().then(() => {
      toast({
        title: "Logged out successfully",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "error",
      });

      setUser({user: null})
      Cookies.remove("token")
      Cookies.remove("admin")
      navigate("/")
    })
  }
  return (
    <Flex>
      {Cookies.get("token") ? <Button
        onClick={handleLogoutBtn}
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
        borderRadius="30px">Log out</Button> : ""}
      
    </Flex>
  )
}

export default Logout
