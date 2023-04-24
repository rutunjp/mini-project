import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  WrapItem,
  Wrap,
  ModalFooter,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useUpdateProfile, useUpdatePassword } from 'react-firebase-hooks/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../../firebase-config'

export default function UserProfileEdit() {
  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [password, setPassword] = useState('')
  const [updatePassword, updating, error] = useUpdatePassword(auth)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()
  if (!auth.currentUser) {
    return <p>Signed Out</p>
  } else if (auth.currentUser) {
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar src={photoURL}></Avatar>
              </Center>
              <Center w="full">
                <Button w="full" onClick={onOpen}>
                  Change Icon
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Modal Title</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Wrap>
                          <WrapItem>
                            <Avatar
                              size="xl"
                              name="Prosper Otemuyiwa"
                              onClick={(e) => {
                                setPhotoURL(e.target.src)
                              }}
                              src="https://bit.ly/prosper-baba"
                            />
                          </WrapItem>
                          <WrapItem>
                            <Avatar
                              size="xl"
                              onClick={(e) => {
                                setPhotoURL(e.target.src)
                              }}
                              name="Christian Nwamba"
                              src="https://bit.ly/code-beast"
                            />
                          </WrapItem>
                          <WrapItem>
                            <Avatar
                              size="xl"
                              onClick={(e) => {
                                setPhotoURL(e.target.src)
                              }}
                              name="Segun Adebayo"
                              src="https://bit.ly/sage-adebayo"
                            />
                          </WrapItem>
                        </Wrap>
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder={auth.currentUser.displayName}
              _placeholder={{ color: 'gray.500' }}
              type="text"
              onChange={(e) => {
                setDisplayName(e.target.value)
              }}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder={auth.currentUser.email}
              disabled
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}
              onClick={(e) => {
                e.preventDefault()
                router.push('/')
              }}
            >
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={async () => {
                const success = await updatePassword(password)
                if (success) {
                  alert('Updated password')
                } else if (error) {
                  alert(error)
                }
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    )
  }
}
