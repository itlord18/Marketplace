import {Card,CardBody,CardFooter,Image,Stack,Heading,Text,Divider, Button} from '@chakra-ui/react'

export function ProductCard({ product, onSelect }) {

    const {id, title, price, inventory} = product

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
              Inventory: {inventory}
            </Text>
            <Text color='blue.600' fontSize='2xl'>
              Price: {price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <Button variant='solid' colorScheme='blue' onClick={() => onSelect(id)}>
              View here
            </Button>
        </CardFooter>
      </Card>
      
    );
}
