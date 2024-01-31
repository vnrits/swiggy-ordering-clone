import {
  Flex,
  HStack,
  useTheme,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const Admin = () => {
  const theme = useTheme();
  
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
      <AdminSidebar />
      <Flex w="100%">
        <Outlet />
      </Flex>
    </HStack>
  )
}

export default Admin
