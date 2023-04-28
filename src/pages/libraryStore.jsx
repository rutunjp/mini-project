import { Box, Grid, Heading, Button } from '@chakra-ui/react'
import BookCard from '../components/bookCard'
import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { db } from '../../firebase-config'
import Navbar from '@/components/navBar'
import UserAuthContext from '@/context/userAuthContext'

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
      src={book.imgSrc}
      isLibraryStore={true}
    />
  ))
  return (
    <Box>
      <Navbar />
      <Box p={6} maxW="80vw" m="auto">
        <Heading>Library Store</Heading>
        <Grid templateColumns="repeat(3, 1fr) ">{bookCards}</Grid>
      </Box>
    </Box>
  )
}
