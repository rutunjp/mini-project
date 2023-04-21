import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { auth } from '../../firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import Navbar from '@/components/navBar'
import DashboardGrid from '@/components/dashboardGrid'

export default function Home() {
  return (
    <ChakraProvider>
      <Navbar />
      <DashboardGrid />
    </ChakraProvider>
  )
}
