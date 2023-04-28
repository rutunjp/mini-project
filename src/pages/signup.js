import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  useToast,
  Heading,
  Text,
  useColorModeValue,
  Link,
  ChakraProvider,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase-config'
import { useRouter } from 'next/router'
import { db } from '../../firebase-config'
import UserAuthContext, { useAuth } from '@/context/userAuthContext'
function SignUp() {
  const { error, SignUp, currentUser } = useAuth()
  const [err, setError] = useState('')
  const [backError, setBackError] = useState('')
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
  })
  useEffect(() => {
    console.log('I am IN')

    if (error) {
      setInterval(() => {
        setBackError('')
      }, 5000)
      setBackError(error)
    }
  }, [error, currentUser])

  const userHandler = (e) => {
    const { name, value } = e.target

    console.log(name, ':', value)
    setUser((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  const SubmitHandler = async (e) => {
    e.preventDefault()
    const { email, password, userName } = user
    if (password == '' || userName == '' || email == '') {
      console.error('No fields should be left empty')
    } else {
      SignUp(email, password, userName)
      {
        currentUser &&
          setUser({
            email: '',
            password: '',
            userName: '',
          })
      }
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="displayName">
                  <FormLabel>Display Name</FormLabel>
                  <Input
                    type="text"
                    value={user.userName}
                    name="userName"
                    onChange={userHandler}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={user.email}
                name="email"
                onChange={userHandler}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={user.password}
                  name="password"
                  onChange={userHandler}
                />
                <InputRightElement h={'full'}>
                  <Button variant={'ghost'}>
                    {/* {showPassword ? <ViewIcon /> : <ViewOffIcon />} */}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={(e) => {
                  SubmitHandler(e)
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                {/* <Link href="/signin" color={'blue.400'}>
                  Login
                </Link> */}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
export default SignUp
