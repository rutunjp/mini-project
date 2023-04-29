import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  InputGroup,
  InputRightElement,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase-config'
import { useRouter } from 'next/router'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast()
  const toastIdRef = useRef()
  function signinErrorToast() {
    toastIdRef.current = toast({
      description: 'Login Error',
      duration: 3000,
      status: 'error',
      isClosable: true,
    })
  }
  if (error) {
    signinErrorToast()
  }
  if (loading) {
    return <p>Loading...</p>
  }
  if (user) {
    router.push('/dashboard')
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      // eslint-disable-next-line react-hooks/rules-of-hooks
      bg={'white'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={(e) => {
                  e.preventDefault()
                  signInWithEmailAndPassword(email, password)
                }}
              >
                Sign in
              </Button>
              <Stack>
                <Text align={'center'}>
                  New user?{' '}
                  <Link
                    onClick={() => {
                      router.push('/signup')
                    }}
                    color={'blue.400'}
                  >
                    Sign Up
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
const Toast = () => {
  return toast({
    title: 'Account created.',
    description: "We've created your account for you.",
    status: 'success',
    duration: 9000,
    isClosable: true,
  })
}
