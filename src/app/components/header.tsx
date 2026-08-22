'use client';

import React from 'react';
import { HStack, Box, Image, Button, Flex } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaBoxOpen, FaHeart, FaShoppingBag, FaSmile } from 'react-icons/fa';
import Logo from './logo.svg';
import { Icons } from './icons';
import { Search } from './search';
import '../shop.css';
import type { TFunction } from "i18next";

interface HeaderProps {
  homeLink: () => void;
  basketLink: () => void;
  t: TFunction;
}

export function Header({ homeLink, basketLink, t }: HeaderProps) {
  

  const iconsData = [
    {   
      icon: <FaSmile size="24px" />,
      label: t('loginKey', 'Log in'),
      onClick: () => console.log('Login clicked'), 
    },
    {
      icon: <FaBoxOpen size="24px" />,
      label: t('ordersKey', 'Orders'),
      onClick: () => console.log('Orders clicked'), 
    },
    {
      icon: <FaHeart size="24px" />,
      label: t('favouritesKey', 'Favourites'),
      onClick: () => console.log('Favourites clicked'),
    },
    {
      icon: <FaShoppingBag size="24px" />,
      label: t('basketKey', 'Basket'),
      onClick: () => basketLink(),
    },
  ];

  return (
    <Box as="header" bg="white" p={2} boxShadow="md" width="100%" gridColumn="1/-1">
      <Flex align="center" justify="space-between" ml={12} mr={12} direction={['column', 'column', 'row']}>
        <HStack onClick={homeLink} m={2}>
          <Image src={Logo} alt="logo"/>
        </HStack>

        <Button bg="blue.500" m={2} color="white" _hover={{ bg: 'blue.300', color: 'white.700' }} h={12}>
          <HamburgerIcon mr={2} />
          {t('Catalog')}
        </Button>

        <Search t={t} />

        <Flex direction="row" mt={[2, 2, 0]} align="center" justify="space-between" gap="16px">
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
