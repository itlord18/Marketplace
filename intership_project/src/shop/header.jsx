import { HStack, VStack, Box, Input, Image, Button, Flex, IconButton,Text } from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon,  } from "@chakra-ui/icons";
import { FaBoxOpen,FaHeart,FaShoppingBag,FaSmile } from "react-icons/fa";
import './shop.css';
import Logo from './logo.svg'
import {Icons} from "./icons"
import {Search} from "./search"

export function Header({homeLink,basketLink}) {
    
    const iconsData = [
        {   
            icon: <FaSmile size="24px" />,
            label: 'Войти',
            onClick: () => console.log(''), 
        },
        {
            icon: <FaBoxOpen size="24px" />,
            label: 'Заказы',
            onClick: () => console.log(''), 
        },
        {
            icon: <FaHeart size="24px" />,
            label: 'Избранное',
            onClick: () => console.log(''),
        },
        {
            icon: <FaShoppingBag size="24px" />,
            label: 'Корзина',
            onClick: () => basketLink(),
        },
      ];

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

                <Search />
                
                <Flex direction='row' mt={[2,2,0]} align="center" justify="space-between" gap='16px'>
                    {iconsData.map((item, index) => (
                        <Icons
                            key={index} 
                            icon={item.icon} 
                            label={item.label}
                            onClick={item.onClick} 
                        />
                    ))}
                      
                
                </Flex>
                
            
            </Flex>
        </Box>
    );
}

        