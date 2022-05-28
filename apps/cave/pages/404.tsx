import { Card, Flex, Heading, Image } from '@concave/ui'
import { useEffect, useState } from 'react'

const NotFoundPage = () => {
  const [image, setImage] = useState('')

  useEffect(() => {
    if (!image)
      fetch('https://api.concave.lol/memes/random', { method: 'GET' })
        .then((res) => res.json())
        .then((json) => json.meme[0]['full_file_path'])
        .then(setImage)
        .catch((e) => {})
  }, [image])

  return (
    <Flex justify="center" align="center" w="100%" direction={'column'} gap="10">
      <Image src="https://concave.lol/static/logo.png" boxSize={'15%'}></Image>
      <Heading fontSize="5xl">404</Heading>
      <Image src={image && image} boxSize="400px" rounded={'2xl'} />
    </Flex>
  )
}

export default NotFoundPage
