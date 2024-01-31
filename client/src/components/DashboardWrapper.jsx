import React from 'react'
import { VStack } from "@chakra-ui/react";

const DashboardWrapper = ({
    children,
}) => {
    return (
        <VStack
            overflowY="auto"
            p="2rem"
            h="100vh"
            w="100%"
        >
            {children}
        </VStack>
    )
}

export default DashboardWrapper