import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '@/components/navBar'
import DashboardGrid from '@/pages/dashboard'
import { Box, Stack } from '@chakra-ui/react'
import UserAuthContext from '@/context/userAuthContext'
import Hero from '@/components/hero'
export default function Home() {
  return (
    <ChakraProvider>
      <UserAuthContext>
        <Navbar />
        <Hero />
      </UserAuthContext>
    </ChakraProvider>
  )
}
