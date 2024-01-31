import React from 'react'
import { VStack } from '@chakra-ui/react'

const LandingPageWrapper = ({children,}) => {
  return (
    <VStack w="full">
      <VStack w="1280px">
        {children}
      </VStack>
    </VStack>
  )
}

export default LandingPageWrapper
