"use client"

import { Button, Image } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/number-input'
import React, { useMemo } from 'react'
import type { TFunction } from "i18next"
import { BackButton } from './backButton'
import { calculateOrderPrice } from '../../utils/currency'

interface Product {
  id: number;
  title: string;
  price: number;
  inventory?: number;
  color: string;
}

interface ProductDetailsProps {
    product: Product;
    quantity: number;
    onQuantityChange: (value: number) => void;
    onAddToBasket: (id: Product['id']) => void;
    isInBasket: boolean;
    t: TFunction;
    selectProduct: (id: Product['id']) => void; 
}

export function ProductDetails({ 
    product, 
    quantity, 
    onQuantityChange, 
    onAddToBasket, 
    isInBasket,
    selectProduct, 
    t 
}: ProductDetailsProps) {

    
    
    const { id, title, price, inventory, color } = product;
    const orderPrice = useMemo(() => {
        return calculateOrderPrice(price, quantity);
    }, [price, quantity]);
    
    return (
        <div className="single-product">
            <div className='backToShop'>
                <BackButton onBack={() => {
                console.log('🔙 Возврат к каталогу');
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
                    <p>
                        {t('priceKey', 'Price')}: {price}<br />
                        {t('inventoryKey', 'Inventory')}: {inventory}<br />
                        {t('colorKey', 'Color')}: {color}
                    </p>
                    {t('yourOrderKey', 'Your order')}:<br />
                    {t('quantityKey', 'Quantity')}: 
                    <NumberInput 
                        step={1} 
                        value={quantity} 
                        min={1} 
                        max={inventory} 
                        onChange={(_, valueAsNumber) => onQuantityChange(valueAsNumber)} 
                        size='md' 
                        w='md'
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <br />
                    {t('orderPriceKey', 'Order price')}: {orderPrice} <br />
                    {isInBasket ? 
                        <p style={{ color: "red", fontSize: 32 }}>
                            {t('productAtBasketKey', 'You have this product in the basket')}
                        </p> : 
                        <Button variant='solid' colorScheme='blue' onClick={() => onAddToBasket(id)}>
                            {t('addToBasketKey', 'Add to basket')}: {orderPrice} <br />
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}