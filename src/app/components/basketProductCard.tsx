"use client"

import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React from 'react';
import type { TFunction } from "i18next";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
}
interface BasketProductCardProps{
    product: Product;
    handleGetBasketProduct: (id: Product['id']) => void;
    onDeleteProduct: (id: Product['id']) => void;
    t: TFunction;
}

export function BasketProductCard( { product, handleGetBasketProduct, onDeleteProduct, t }: BasketProductCardProps ) {
    const { id, title, price, quantity } = product;
    if (!t || typeof t !== 'function') {
        return <div>Loading translations...</div>;
    }

    return (
        <Card maxW='lg' align='center'
          shadow=' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
          borderRadius='45px'
        >
            <CardBody textAlign='start' p="0">
                <Image 
                    alt={title}
                    borderRadius="45px 45px 0px 0px"
                    src="/pictures/avengers.png"
                    width="100%"
                    objectFit="cover"
                />
                <Stack spacing="1"  pl="12">
                    <Heading size='md'>{title}</Heading>
                    <Text color='blue.600' fontSize='2xl'>
                    {t( 'quantityKey', 'Quantity' )}: {quantity}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                    {t( 'priceKey', 'Price' )}: {price}
                    </Text>
                </Stack>
            </CardBody>
            <CardFooter pb="4">
                <ButtonGroup width="100%" spacing={4}> 
                    <Button
                        flex={1} 
                        variant='solid'
                        colorScheme='blue'
                        onClick={() => {
                            console.log("id:   "+ id);
                            handleGetBasketProduct( id )}}
                    >
                        {t( 'viewHereKey', 'View here' )}
                    </Button>
                    
                    <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Delete"
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
