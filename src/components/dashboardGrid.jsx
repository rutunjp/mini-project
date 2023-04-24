import {
  Box,
  Grid,
  Heading,
  Tabs,
  Tab,
  TabPanel,
  UnorderedList,
  TabList,
  ListItem,
  TabPanels,
} from '@chakra-ui/react'
import BookCard from './bookCard'
import { collection, getDocs, query } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebase-config'
var bookArray

export default function DashboardGrid() {
  const user = auth.currentUser

  const booksCollectionRef = collection(db, 'books')
  const userCollectionRef = collection(db, 'users')
  const userDocs = getDocs(userCollectionRef)
  console.log('USERDOCS:', userDocs)

  const [books, setBooks] = useState([])
  const [completed, setCompleted] = useState([])
  const [favourites, setFavourites] = useState([])
  const [reading, setReading] = useState([])
  const [wantToRead, setWantToRead] = useState([])
  const [allBooks, setAllBooks] = useState([])
  useEffect(() => {
    async function getBooks() {
      const data = await getDocs(booksCollectionRef)

      setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getBooks()
  }, [])
  async function checkUserNew(userCollectionRef) {
    const docsSnap = await getDocs(userCollectionRef)
    docsSnap.forEach((doc) => {
      console.log('USERSDOCS:', doc.data())
      setFavourites(doc.data().favourites)
      setAllBooks(doc.data().allBooks)
      setWantToRead(doc.data().wantToRead)
      setCompleted(doc.data().completed)
      setReading(doc.data().reading)
    })
  }

  checkUserNew(userCollectionRef)
  const bookCards = books.map((book) => {
    if (book.title != '') {
      return (
        <BookCard
          title={book.title}
          author={book.author}
          genre={book.genre}
          key={book.isbn}
        />
      )
    }
  })

  const wantToReadCards = wantToRead.map((book) => {
    if (book.title != 'undefined') {
      return (
        <BookCard
          title={book.title}
          author={book.author}
          genre={book.genre}
          key={book.isbn}
        />
      )
    } else if (book.title == 'undefined') {
      return <p key={1}>Add New Books!</p>
    }
  })
  const allBooksCards = allBooks.map((book) => (
    <BookCard
      title={book.title}
      author={book.author}
      genre={book.genre}
      key={book.isbn}
    />
  ))
  const completedCards = completed.map((book) => (
    <BookCard
      title={book.title}
      author={book.author}
      genre={book.genre}
      key={book.isbn}
    />
  ))
  const readingCards = reading.map((book) => (
    <BookCard
      title={book.title}
      author={book.author}
      genre={book.genre}
      key={book.isbn}
    />
  ))
  const favouritesCards = favourites.map((book) => (
    <BookCard
      title={book.title}
      author={book.author}
      genre={book.genre}
      key={book.isbn}
    />
  ))

  return (
    <Box p={6}>
      <Heading>Reading</Heading>
      <Grid templateColumns="repeat(5, 1fr)">{bookCards}</Grid>
      <Heading>All Books</Heading>
      <Grid templateColumns="repeat(5, 1fr)">{bookCards}</Grid>
      <Heading>Completed</Heading>
      <Grid templateColumns="repeat(5, 1fr)">{completedCards}</Grid>

      <Heading>Want To Read</Heading>
      <Grid templateColumns="repeat(5, 1fr)">{wantToReadCards}</Grid>
      <Heading>Favourites</Heading>
      <Grid templateColumns="repeat(5, 1fr)">{favouritesCards}</Grid>
      <Heading>All Books</Heading>
      <Grid templateColumns="repeat(4, 1fr)">{bookCards}</Grid>
    </Box>
  )
}
