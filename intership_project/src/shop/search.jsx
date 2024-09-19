import { Input,IconButton, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
export function Search() {

    return (
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
    );
}
