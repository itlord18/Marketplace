import {Card,CardBody,CardFooter,Image,Stack,Heading,Text,Divider, Button,ButtonGroup} from '@chakra-ui/react'


export function BasketProductCard({ product, handleGetBasketProduct }) {

    const {id, title, price, quantity} = product

    return (
       
        <Card maxW='lg' align='center'>
        <CardBody align='start'>
          <Image 
            alt= {title}
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{title}</Heading>
            <Text color='blue.600' fontSize='2xl'>
              Quntity: {quantity}
            </Text>
            <Text color='blue.600' fontSize='2xl'>
              Price: {price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <Button variant='solid' colorScheme='blue' onClick={() => handleGetBasketProduct(id)}>
              View here
            </Button>
        </CardFooter>
      </Card>
      
    );
}
