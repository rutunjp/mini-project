import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Badge,
  Text,
  Modal,
  ModalOverlay,
  Slider,
  SliderTrack,
  Input,
  SliderFilledTrack,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SliderThumb,
  Select,
  Stack,
  Checkbox,
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { db } from '../../firebase-config'
import Image from 'next/image'
import {
  query,
  getDocs,
  doc,
  where,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDoc,
  deleteDoc,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { auth } from '../../firebase-config'

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'

export default function BookCard(props) {
  const auth = getAuth()
  const [isFav, toggleIsFav] = useState(false)
  const isLibraryStore = props.isLibraryStore
  const toast = useToast()

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  useEffect(() => {
    if (isFav) {
      addFav()
    }
  }, [isFav])

  async function addFav() {
    await updateDoc(userDoc, {
      favourites: arrayUnion(props.title),
    })
  }
  async function addBook() {
    await updateDoc(userDoc, {
      allBooks: arrayUnion(props.title),
    })
    {
      toast({
        title: 'Book added',
        description: `${props.title} has been added to Dashboard`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  async function deleteBook() {
    await updateDoc(userDoc, {
      allBooks: arrayRemove(props.title),
      favourites: arrayRemove(props.title),
      wantToRead: arrayRemove(props.title),
      completed: arrayRemove(props.title),
      reading: arrayRemove(props.title),
    })
  }

  async function updateBookData(category) {
    if (category == 'completed') {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        completed: arrayUnion(props.title),
      })
    } else if (category == 'wantToRead') {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        wantToRead: arrayUnion(props.title),
      })
    } else if (category == 'reading') {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        reading: arrayUnion(props.title),
      })
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'md'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        onClick={onOpen}
      >
        {isLibraryStore ? (
          <></>
        ) : (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <HStack align={'space-between'}>
                  <Heading as="h3" size="md">
                    {props.title}
                  </Heading>
                </HStack>

                <Text>{props.genre}</Text>
              </ModalHeader>
              <ModalBody>
                <HStack>
                  <Input
                    type={'number'}
                    size={'sm'}
                    w={'8ch'}
                    value={props.progress}
                  />
                  <Text>of 266</Text>
                </HStack>
                <Select
                  value={props.status}
                  onChangeCapture={(e) => {
                    updateBookData(e.target.value)
                  }}
                  placeholder="Select Status"
                  isRequired
                >
                  <option value="reading">Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="completed">Completed</option>
                </Select>
                <Checkbox
                  isChecked={isFav}
                  onChange={() => toggleIsFav(!isFav)}
                >
                  Add to Favourites
                </Checkbox>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => {
                    onClose()
                  }}
                  colorScheme="blue"
                >
                  Save
                </Button>
                <Button colorScheme="red" onClick={(e) => deleteBook(e)}>
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
        <Box rounded={'lg'} mt={-12} pos={'relative'} height={'230px'}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={props.imageLink}
            alt="coverbook"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {props.author}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {props.title}
          </Heading>
          <Stack direction={'col'} align={'center'}>
            {isLibraryStore ? (
              <Button colorScheme="blue" onClick={addBook}>
                Add to Dashboard
              </Button>
            ) : (
              <></>
            )}

            <Text fontWeight={800} fontSize={'xl'}>
              {/* {badges} */}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}
