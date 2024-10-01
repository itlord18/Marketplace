import { VStack,IconButton,Text } from "@chakra-ui/react";
import React from 'react';

export function Icons({icon, label, onClick}) {

    return (
        <VStack ml={1} mr={1} h={12} onClick={onClick}>
            <IconButton
                icon={icon}
                aria-label={label}
                size="md"
                variant="ghost"
                color="gray.500"
            />
            <Text fontSize='14px' color='black' >{label}</Text>
        </VStack>
    );
}
