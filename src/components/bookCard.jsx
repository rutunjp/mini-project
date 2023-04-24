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
  Image,
} from '@chakra-ui/react'
import { useState } from 'react'

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'

export default function BookCard(props) {
  const [isFav, setFav] = useState(false)
  // const badges = props.genre.map((genre) => (
  //   <Badge m={1} key={genre} fontWeight={'normal'}>
  //     {' '}
  //     {genre}
  //   </Badge>
  // ))
  function updateBookData(e) {}
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <HStack align={'space-between'}>
                <Heading as="h3" size="md">
                  {props.bookTitle}
                </Heading>
              </HStack>

              <Text>{props.bookGenre}</Text>
            </ModalHeader>
            <ModalBody>
              <Slider>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>

              <Select
                onChangeCapture={(e) => {
                  updateBookData(e)
                }}
                placeholder="Select Status"
                isRequired
              >
                <option value="reading">Reading</option>
                <option value="want-to-read">Want to Read</option>
                <option value="completed">Completed</option>
              </Select>
              <Checkbox>Add to Favourites</Checkbox>
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
        <Box rounded={'lg'} mt={-12} pos={'relative'} height={'230px'}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src="http://books.google.com/books/content?id=xVeMCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
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
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              {/* {badges} */}
            </Text>
          </Stack>
          {/* <Button
            variant={isFav ? 'solid' : 'outline'}
            colorScheme={isFav ? 'blackAlpha' : 'red'}
            onClick={() => setFav(!isFav)}
          >
            {isFav ? 'Add to Favourite' : 'Remove from Favourite'}
          </Button> */}
        </Stack>
      </Box>
    </Center>
  )
}
