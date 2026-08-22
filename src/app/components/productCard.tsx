"use client"

import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button } from '@chakra-ui/react';
import React from 'react';
import type { TFunction } from "i18next";


interface Product {
  id: number;
  title: string;
  price: number;
  inventory?: number;
}

interface ProductCardProps {
  product: Product;
  onSelect: (id: Product['id']) => void;
  t: TFunction;
}

export function ProductCard({ product, onSelect, t }: ProductCardProps) {
    const { id, title, price, inventory }: Product = product;

    return (
        <Card 
            maxW="lg" 
            align="center"  
            shadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
            borderRadius="45px"
        >
            <CardBody textAlign="start" p="0">
                <Image 
                    alt={title}
                    borderRadius="45px 45px 0px 0px"
                    src="/pictures/avengers.png"
                    width="100%"
                    objectFit="cover"
                />
                <Stack spacing="1"  pl="12">
                    <Heading size="md">{title}</Heading>
                    <Text color="blue.600" fontSize="2xl">
                        {t('inventoryKey', 'Inventory')}: {inventory}
                    </Text>
                    <Text color="blue.600" fontSize="2xl">
                        {t('priceKey', 'Price')}: {price}
                    </Text>
                </Stack>
            </CardBody>
            <CardFooter pb="4"> 
                <Button variant="solid" colorScheme="blue" onClick={() => onSelect(id)}>
                    {t('viewHereKey', 'View here')}
                </Button>
            </CardFooter>
        </Card>
    );
}
