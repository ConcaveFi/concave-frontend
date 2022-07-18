import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@concave/ui'
import { withPageTransition } from 'components/PageTransition'
import { verifyTypedData } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import { useSignTypedData } from 'wagmi'

const Faucet = () => {
  const [domain, setDomain] = useState({})

  const [value, setValue] = useState<{}>({})

  const [types, setTypes] = useState({})
  const [tempTypes, setTempTypes] = useState(JSON.stringify(types))
  useEffect(() => {
    if (!tempTypes) {
      return
    }
    try {
      const obj = jsonParse(tempTypes)
      setShowInputs(false)
      setTimeout(() => {
        setTypes(obj)
        setShowInputs(true)
      }, 1000)
    } catch (e) {
      // console.error(`error to parse`)
      // try {
      //   const jsonValue = eval(`JSON.stringify (${tempTypes})`)
      //   setTempTypes(jsonValue)
      // } catch (e) {}
    }
  }, [tempTypes, setTypes])

  useEffect(() => {
    const tempValue = { ...value }
    Object.entries(types).map(([type, props]) => {
      console.log(tempValue, types)
      tempValue[type] = types[type] ? tempValue[type] : undefined

      console.log(tempValue)
    })
    setValue(tempValue)
  }, [types, setValue])

  const [signerAddress, setSignerAddress] = useState('')
  const [v, setV] = useState(0)
  const [r, setR] = useState('')
  const [s, setS] = useState('')
  const [signature, setSignature] = useState('')
  const [showInputs, setShowInputs] = useState(true)
  const { signTypedDataAsync } = useSignTypedData({
    types,
    domain,
    value,
  })

  const create = () => {
    console.log(`create`)
    signTypedDataAsync()
      .then(async (data) => {
        const tmpSignature = data.substring(2)
        const signatureObject = {
          r: `0x${tmpSignature.substring(0, 64)}`,
          s: `0x${tmpSignature.substring(64, 128)}`,
          v: parseInt(tmpSignature.substring(128, 130), 16),
        }
        setSignature(data)
        setSignerAddress(verifyTypedData(domain, types, value, signatureObject))
        setV(signatureObject.v)
        setR(signatureObject.r)
        setS(signatureObject.s)
      })
      .catch(alert)
  }

  return (
    <Box w={'100%'} overflowY={'hidden'} apply="scrollbar.secondary">
      <Flex
        align={'center'}
        w={'100%'}
        borderRadius={0}
        gap={4}
        textAlign="center"
        direction="column"
      >
        <>
          <Heading as="h1" mt={16} mb={3} fontSize="5xl">
            To sign test
          </Heading>

          <Flex
            direction="column"
            float={'left'}
            position="relative"
            justify={'center'}
            align="center"
            width="full"
            gap={5}
            p={{ base: 0, sm: 4 }}
          >
            <Card p={6} gap={6} variant="primary" h="fit-content" shadow="Block Up" w="100%">
              <HStack>
                <Text w={'90px'}>Domain: </Text>
                <Textarea
                  width={'full'}
                  value={JSON.stringify(domain)}
                  onChange={({ target }) => setDomain(jsonParse(target.value))}
                />
              </HStack>
              <HStack>
                <Text w={'90px'}>Types: </Text>
                <Textarea
                  width={'full'}
                  value={tempTypes}
                  onChange={({ target }) => setTempTypes(target.value)}
                />
              </HStack>

              <VStack>
                <HStack w={'full'}>
                  <Text w={'90px'}>Value: </Text>
                  <Textarea
                    width={'full'}
                    value={JSON.stringify(value)}
                    onChange={({ target }) => setValue(jsonParse(target.value))}
                  />
                </HStack>
                <Button
                  _focus={{}}
                  size={`md`}
                  w={'full'}
                  variant={'primary'}
                  onClick={() => {
                    alert(`compare the imputs before sending`)
                    setValue({})
                  }}
                >
                  Clean Value
                </Button>
              </VStack>

              {showInputs &&
                Object.entries(types).map(([type, props]) => {
                  return (
                    <Stack key={type} gap={2}>
                      <Text>{type}</Text>
                      {/* @ts-ignore */}
                      {props.map((p) => {
                        //@ts-ignore
                        const name = p.name || p.Name
                        return (
                          <HStack key={type + name}>
                            <Text w={'90px'}>{name}: </Text>
                            <Input
                              width={'full'}
                              value={value[name]}
                              onChange={({ target }) =>
                                setValue((old) => {
                                  return { ...old, [name]: target.value }
                                })
                              }
                              onFocus={({ target }) =>
                                setValue((old) => {
                                  return { ...old, [name]: target.value }
                                })
                              }
                            />
                          </HStack>
                        )
                      })}
                    </Stack>
                  )
                })}
              <Button _focus={{}} size={`md`} variant={'primary'} onClick={create}>
                To sign
              </Button>
            </Card>
          </Flex>
        </>
      </Flex>

      <Box>
        <HStack>
          <Text w={'100px'}>signer: </Text> <Text w={'full'}>{signerAddress}</Text>
        </HStack>
        <HStack>
          <Text w={'100px'}>signature: </Text> <Text w={'full'}>{signature}</Text>
        </HStack>
        <HStack>
          <Text w={'100px'}>r: </Text> <Text w={'full'}>{r}</Text>
        </HStack>
        <HStack>
          <Text w={'100px'}>s: </Text> <Text w={'full'}>{s}</Text>
        </HStack>
        <HStack>
          <Text w={'100px'}>v: </Text> <Text w={'full'}>{v}</Text>
        </HStack>
      </Box>
    </Box>
  )
}
const jsonParse = (value: string) => JSON.parse(toJson(value))
const toJson = (value: string) => {
  try {
    const obj = JSON.parse(value)
    return value
  } catch (e) {
    try {
      return eval(`JSON.stringify (${value})`)
    } catch (e) {
      console.error(`error to parse`)
      throw `error`
    }
  }
}
export default withPageTransition(Faucet)
