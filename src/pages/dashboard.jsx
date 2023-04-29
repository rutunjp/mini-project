import Navbar from '@/components/navBar'
import { Box, Grid, Heading, Button, Text } from '@chakra-ui/react'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { auth } from '../../firebase-config'
import { db } from '../../firebase-config'
import { useEffect, useState } from 'react'
import UserAuthContext from '@/context/userAuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import BookCard from '@/components/bookCard'

export default function Dashboard() {
  const booksCollectionRef = collection(db, 'books')
  const userCollectionRef = collection(db, 'users')
  const [books, setBooks] = useState([])
  const [userAllBooks, setUserAllBooks] = useState(null)
  const [userReading, setUserReading] = useState(null)
  const [userWantToRead, setUserWantToRead] = useState(null)
  const [userCompleted, setUserCompleted] = useState(null)
  const [userFavourites, setUserFavourites] = useState([])

  useEffect(() => {
    async function getUserData() {
      try {
        if (auth.currentUser) {
          const userDocRef = doc(db, 'users', auth.currentUser.uid)
          const userDoc = await getDoc(userDocRef)
          const { reading, completed, wantToRead, favourites, allBooks } =
            userDoc.data()

          function fetchByCategory(bookCategory, setter) {
            const results = books.filter((book) =>
              bookCategory.includes(book.title)
            )

            setter(
              results.map((book) => (
                <BookCard
                  title={book.title}
                  author={book.author}
                  genre={book.genre}
                  key={book.isbn}
                  src={book.imageLink.thumbnail}
                  isLibraryStore={false}
                />
              ))
            )
          }

          fetchByCategory(favourites, setUserFavourites)
          fetchByCategory(allBooks, setUserAllBooks)
          fetchByCategory(reading, setUserReading)
          fetchByCategory(wantToRead, setUserWantToRead)
          fetchByCategory(completed, setUserCompleted)
        }
      } catch (error) {
        console.error(error)
      }
    }

    async function getBooks() {
      const data = await getDocs(booksCollectionRef)
      setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getBooks()
    getUserData()
  }, [auth.currentUser, userAllBooks])

  return (
    <UserAuthContext>
      <Box>
        <Navbar />
        <Box maxW={'80vw'} m="auto">
          <Heading>All Books</Heading>
          <Grid templateColumns={'repeat(5  , 1fr)'}  w={'max-content'}>
            {userAllBooks && userAllBooks.length ? (
              userAllBooks
            ) : (
              <Text>No Books</Text>
            )}
          </Grid>
          <Heading>Fav Books</Heading>
          <Grid templateColumns={'repeat(5  , 1fr)'}  w={'max-content'}>
            {userFavourites && userFavourites.length ? (
              userFavourites
            ) : (
              <Text>No Books</Text>
            )}
          </Grid>
          <Heading>Now Reading </Heading>
          <Grid templateColumns={'repeat(5  , 1fr)'}  w={'max-content'}>
            {userReading && userReading.length ? (
              userReading
            ) : (
              <Text>No Books</Text>
            )}
          </Grid>
          <Heading>Completed Books</Heading>
          <Grid templateColumns={'repeat(5  , 1fr)'}  w={'max-content'}>
            {userCompleted && userCompleted.length ? (
              userCompleted
            ) : (
              <Text>No Books</Text>
            )}
          </Grid>
          <Heading>Want To Read</Heading>
          <Grid templateColumns={'repeat(5  , 1fr)'}  w={'max-content'}>
            {userWantToRead && userWantToRead.length ? (
              userWantToRead
            ) : (
              <Text>No Books</Text>
            )}
          </Grid>
        </Box>
      </Box>
    </UserAuthContext>
  )
}
