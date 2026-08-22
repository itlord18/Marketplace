"use client"

import { Button, HStack, Image, } from '@chakra-ui/react'
import {NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from '@chakra-ui/number-input'
import React, { useMemo } from 'react';
import type { TFunction } from "i18next";
import { BackButton } from './backButton';
import { calculateOrderPrice } from '../../utils/currency';

interface BasketProduct{
    id: number;
    title: string;
}

interface ProductForBasket{
    price: number;
    inventory?: number;
    color?: string;
}

interface BasketDetailsProps{
    basketProduct: BasketProduct;
    productForBasket: ProductForBasket;
    quantity: number;
    onQuantityChange: (value: number) => void;
    onUpdateBasket: (
    id: number,
    title: string,
    orderPrice: number,
    quantity: number,
    color: string
    ) => void;
  onDeleteProduct: (id: number) => void;
  selectProduct: (id: number) => void;
  t: TFunction;
}

export function BasketDetails( { basketProduct, productForBasket, quantity, onQuantityChange, onUpdateBasket, onDeleteProduct, t, selectProduct }: BasketDetailsProps ) {
 
    
    console.log("productForBasket:   "+ productForBasket);
    const { id = 0, title = 'Unknown' } = basketProduct || {}
    const { price = 0, inventory = 0, color = '' } = productForBasket || {}
    const orderPrice = useMemo(() => {
            return calculateOrderPrice(price, quantity);
        }, [price, quantity]);
    
    
    if (!basketProduct || !productForBasket) {
        return <div>Loading...</div>;
    }

    return (
        <div className="single-product">
        <div className='backToShop'>
                        <BackButton onBack={() => {
                        console.log('Возврат к каталогу');
                        selectProduct(null);  
                }} />  
                    </div>   
        <div className='cardDetails' key={id}>
            <div className='cardDetailsImage'>
                <Image 
                    alt={title}
                    src="/pictures/avengers.png"
                    width="100%"
                    objectFit="cover"
                />
            </div>
            <div className='cardDetailsInfo'>
                <h4>{title}</h4><br />
                <p>{t( 'priceKey', 'Price' )}: {price}<br />
                {t( 'inventoryKey', 'Inventory' )}: {inventory}<br />
                {t( 'colorKey', 'Color' )}: {color}</p>
                {t( 'yourOrderKey', 'Your order' )}:<br />
                {t( 'quantityKey', 'Quantity' )}: 
                <NumberInput step={1} value={quantity} min={1} max={inventory} onChange={(_, valueAsNumber) => onQuantityChange(valueAsNumber)} size='md' w='md'>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                <br />
                {t( 'orderPriceKey', 'Order price' )}: {orderPrice} <br />
                <HStack >
                    <Button variant='solid' colorScheme='blue' onClick={() => onUpdateBasket(id, title, price * quantity, quantity, color)}>
                    {t( 'changeOrderKey', 'Change order' )}
                    </Button>
                    <Button variant='solid' colorScheme='red' onClick={() => {
                        onDeleteProduct( id );
                        alert('🔙 Возврат к продукту из каталога');
                        selectProduct(id);
                        }}>
                    {t( 'deleteProductKey', 'Delete Product' )}
                    </Button>
                </HStack>
                    
            </div>
        </div>
        </div>
    );
}
