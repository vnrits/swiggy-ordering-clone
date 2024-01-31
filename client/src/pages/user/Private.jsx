import {
  Flex,
  HStack,
  useTheme,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar"

const Private = () => {
  const theme = useTheme()
  return (
    <HStack
      gap="0"
      w="100%"
      h="100vh"
      flexDir="row"
      justifyContent="center"
      alignItems="flex-start"
      borderRight={`1px solid ${theme.colors.border}`}
    >
      <Sidebar />
      <Flex w="full">
        <Outlet />
      </Flex>
    </HStack>
  )
}

export default Private
