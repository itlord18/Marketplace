import { HStack, VStack, Box, Input, Image, Button, Flex, IconButton,Text } from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon,  } from "@chakra-ui/icons";
import { FaBoxOpen,FaHeart,FaShoppingBag,FaSmile } from "react-icons/fa";
import './shop.css';
import Logo from './logo.svg'

export function Header({homeLink,basketLink}) {
    

    return (
        <Box as="header" bg="white" p={2} boxShadow="md" width='100%' gridColumn='1/-1' >
            <Flex align="center" justify="space-between" ml={12} mr={12} direction={['column','column','row']}>
                <HStack onClick={homeLink} m={2}>
                    <Image src={Logo} />
                </HStack>
                
                <Button bg='blue.500' m={2} color='white.500' _hover={{bg:'blue.300',color:'white.700'}} h={12}>
                    <HamburgerIcon mr={2}/>
                    <Text>Каталог</Text>
                </Button>

                <Flex align="center" className="search" >
                    <Input
                        type="text"
                        placeholder="Искать на Fable"
                        size={['md','md','lg']}
                        w={['md','md','lg']}
                        borderRadius="12px 0 0 12px"
                        borderRight="none"
                        borderColor='blue.500'
                        borderWidth={3}
                        maxLength='255'
                    />

                    <IconButton
                        icon={<SearchIcon />}
                        aria-label="Поиск"
                        size={['md','md','lg']}
                        bg="blue.500"
                        color="white"
                        borderRadius="0 12px 12px 0"
                        _hover={{bg:'blue.300',color:'white.700'}}
                    />
                </Flex>
                
                <Flex direction='row' mt={[2,2,0]} align="center" justify="space-between" gap='16px'>
                    <VStack ml={1} mr={1} h={12}>
                        <IconButton
                            icon={<FaSmile size='24px'/>}
                            aria-label="Войти"
                            size="md"
                            variant="ghost"
                            color="gray.500"
                        />
                        <Text fontSize='14px' color='black' >Войти</Text>
                    </VStack>
                    <VStack ml={1} mr={1} h={12}>
                        <IconButton
                            icon={<FaBoxOpen size='24px'/>}
                            aria-label="Заказы"
                            size="md"
                            variant="ghost"
                            color="gray.500"
                        />
                        <Text fontSize='14px' color='black'>Заказы</Text>
                    </VStack>
                    <VStack ml={1} mr={1} h={12}>
                        <IconButton
                            icon={<FaHeart size='24px'/>}
                            aria-label="Избранное"
                            size="md"
                            variant="ghost"
                            color="gray.500"
                        />
                        <Text fontSize='14px' color='black'>Избранное</Text>
                    </VStack>
                    <VStack onClick={basketLink} ml={1} mr={2} h={12}>
                        <IconButton
                            icon={<FaShoppingBag size='24px'/>}
                            aria-label="Корзина"
                            size="md"
                            variant="ghost"
                            color="gray.500"
                        />
                        <Text fontSize='14px' color='black'>Корзина</Text>
                    </VStack>    
                
                </Flex>
                
            
            </Flex>
        </Box>
    );
}

        