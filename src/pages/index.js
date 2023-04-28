import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '@/components/navBar'
import DashboardGrid from '@/pages/dashboard'
import { Box } from '@chakra-ui/react'
import UserAuthContext from '@/context/userAuthContext'
export default function Home() {
  return (
    <ChakraProvider>
      <UserAuthContext>
        <Navbar />
      </UserAuthContext>
    </ChakraProvider>
  )
}
