import { Box, Grid, Heading, HStack, Button } from '@chakra-ui/react'
import BookCard from '../components/bookCard'
import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { db } from '../../firebase-config'
import Navbar from '@/components/navBar'
import UserAuthContext from '@/context/userAuthContext'
import BookSearchModal from '@/components/bookSearchModal'

export default function LibraryStore() {
  const booksCollectionRef = collection(db, 'books')
  const [books, setBooks] = useState([])
  useEffect(() => {
    async function getBooks() {
      const data = await getDocs(booksCollectionRef)

      setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getBooks()
  }, [])
  const bookCards = books.map((book) => (
    <BookCard
      title={book.title}
      author={book.author}
      genre={book.genre}
      key={book.isbn}
      pageCount={book.pageCount}
      imgSrc={book.imageLink.thumbnail}
      isLibraryStore={false}
    />
  ))
  return (
    <Box>
      <Navbar />
      <Box p={6} maxW="80vw" m="auto">
        <HStack maxW={'100%'} placeItems="stretch">
          <Heading>Library Store</Heading>
          <BookSearchModal />
        </HStack>
        <Grid templateColumns="repeat(3, 1fr) ">{bookCards}</Grid>
      </Box>
    </Box>
  )
}
