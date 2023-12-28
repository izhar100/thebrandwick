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

export default function Login({ handlePage }) {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const toast=useToast()
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const handleLogin = async () => {
        console.log(inputs)
        if (loading) return;
        setLoading(true)
        try {
            const res = await fetch(`${api}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
                    description:`Token: ${data.token}`
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
        } catch (error) {
            console.log(error)
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
                        Login
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    boxShadow={'lg'}
                    p={6}
                    w={{
                        base: 'full',
                        sm: "400px"
                    }}>
                    <Stack spacing={4}>
                        <form action="">
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="text" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
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
                                    loadingText="Login"
                                    size="lg"
                                    bg={useColorModeValue('gray.600', 'gray.700')}
                                    color={'white'}
                                    _hover={{
                                        bg: useColorModeValue('gray.700', 'gray.800'),
                                    }} onClick={handleLogin} isLoading={loading}>
                                    Login
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Don't have an account? <Link color={'blue.400'}
                                        onClick={() => handlePage("signup")}
                                    >Signup</Link>
                                </Text>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}