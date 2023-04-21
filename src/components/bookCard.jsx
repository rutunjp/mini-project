import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Badge,
  Text,
  Stack,
  Button,
  Image,
} from '@chakra-ui/react'
import { useState } from 'react'

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'

export default function BookCard(props) {
  const [isFav, setFav] = useState(false)
  const badges = props.genre.map((genre) => (
    <Badge m={1} key={genre} fontWeight={'normal'}>
      {' '}
      {genre}
    </Badge>
  ))
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
      >
        <Box rounded={'lg'} mt={-12} pos={'relative'} height={'230px'}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={IMAGE}
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
              {badges}
            </Text>
          </Stack>
          <Button
            variant={isFav ? 'solid' : 'outline'}
            colorScheme={isFav ? 'blackAlpha' : 'red'}
            onClick={() => setFav(!isFav)}
          >
            {isFav ? 'Add to Favourite' : 'Remove from Favourite'}
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}
