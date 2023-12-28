import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { api } from './api'

export default function Signup({ handlePage }) {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: ""
    })

    const handleSignup = async () => {

        console.log(inputs)
        if (loading) return
        setLoading(true)
        try {
            const res = await fetch(`${api}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            })
            const data = await res.json()
            console.log(data)
            if (data.message) {
                toast({
                    title: data.message,
                    variant: 'top-accent',
                    isClosable: true,
                    duration: 3000,
                    position: "top",
                    status: 'success',
                    description:data.token
                })
            } else if (data.error) {
                toast({
                    title: data.error,
                    variant: 'top-accent',
                    isClosable: true,
                    duration: 3000,
                    position: "top",
                    status: 'error'
                })
            }
        } catch (err) {
            console.log(err)
            toast({
                title: "Something went wrong",
                variant: 'top-accent',
                isClosable: true,
                duration: 3000,
                position: "top",
                status: 'error'
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <Flex
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={1}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    boxShadow={'lg'}
                    p={6}>
                    <Stack spacing={4}>
                        <form action="">
                            <HStack>
                                <Box>
                                    <FormControl isRequired>
                                        <FormLabel>Name</FormLabel>
                                        <Input type="text" value={inputs.name}
                                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                        />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl isRequired>
                                        <FormLabel>Username</FormLabel>
                                        <Input type="text" value={inputs.username}
                                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                        />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" value={inputs.email}
                                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Phone no.</FormLabel>
                                <Input type="number" value={inputs.phone}
                                    onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} value={inputs.password}
                                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    size="lg"
                                    bg={useColorModeValue('gray.600', 'gray.700')}
                                    color={'white'}
                                    _hover={{
                                        bg: useColorModeValue('gray.700', 'gray.800'),
                                    }}
                                    onClick={handleSignup} isLoading={loading}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link color={'blue.400'}
                                        onClick={() => handlePage("login")}
                                    >Login</Link>
                                </Text>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}