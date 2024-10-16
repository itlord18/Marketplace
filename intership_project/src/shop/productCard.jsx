import { Card,CardBody,CardFooter,Image,Stack,Heading,Text,Divider, Button } from '@chakra-ui/react'
import React from 'react';

export function ProductCard( { product, onSelect } ) {

    const { id, title, price, inventory } = product

    return (
        
        <Card maxW='lg' align='center'  
              shadow=' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
              borderRadius='45px'
              >
        <CardBody align='start'>
          <Image 
            alt= {title}
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{title}</Heading>
            <Text color='blue.600' fontSize='2xl'>
              Inventory: {inventory}
            </Text>
            <Text color='blue.600' fontSize='2xl'>
              Price: {price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <Button variant='solid' colorScheme='blue' onClick={() => onSelect( id )}>
              View here
            </Button>
        </CardFooter>
      </Card>
      
    );
}
