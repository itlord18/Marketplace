import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React from 'react';

export function BasketProductCard( { product, handleGetBasketProduct, onDeleteProduct } ) {
    const { id, title, price, quantity } = product;

    return (
        <Card maxW='lg' align='center'
          shadow=' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
          borderRadius='45px'
        >
            <CardBody align='start'>
                <Image alt={title} borderRadius='lg' />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{title}</Heading>
                    <Text color='blue.600' fontSize='2xl'>
                        Quantity: {quantity}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        Price: {price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup width="100%" spacing={4}> 
                    <Button
                        flex={1} 
                        variant='solid'
                        colorScheme='blue'
                        onClick={() => handleGetBasketProduct( id )}
                    >
                        View here
                    </Button>
                    
                    <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Удалить"
                        bg='red.500'
                        color="white"
                        _hover={{ bg:'red.300',color:'white.700' }}
                        onClick={() => onDeleteProduct( id )}
                    />
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}
