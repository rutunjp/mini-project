import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { auth } from '../../firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import Navbar from '@/components/navBar'
import DashboardGrid from '@/components/dashboardGrid'
import { Box } from '@chakra-ui/react'
import { db } from '../../firebase-config'
import { collection, getDocs } from 'firebase/firestore'
export default function Home() {
  const userCollectionRef = collection(db, 'users')

  const router = useRouter()
  useEffect(() => {
    if (!auth.currentUser) router.push('/signin')
  }, [])
  if (auth.currentUser) {
    return (
      <ChakraProvider>
        {' '}
        <Navbar />
        <Box maxW="80vw" margin={'auto'}>
          <DashboardGrid />
        </Box>
      </ChakraProvider>
    )
  }
}
