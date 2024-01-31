import { Divider, HStack, Text, VStack } from '@chakra-ui/react'
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaRegCopyright } from 'react-icons/fa'

const Footer = () => {
    return (
        <VStack w="full" p="2rem 0">
            <Divider />
            <HStack w="full" justifyContent="space-between">
                {/* <Image src={Logo} h="4rem" /> */}
                <Text>Tasty Hub</Text>
                <HStack><FaRegCopyright /><Text>Tasty Hub 2024 | All rights reserved</Text></HStack>
                <HStack>
                    <Text><FaFacebookSquare /></Text>
                    <Text><FaLinkedin /></Text>
                    <Text><FaInstagram /></Text>
                </HStack>

            </HStack>
        </VStack>
    )
}

export default Footer
