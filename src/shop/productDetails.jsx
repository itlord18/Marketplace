import { Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import React from 'react';

export function ProductDetails( { product, quantity, onQuantityChange, onAddToBasket, isInBasket } ) {
    
    const { id, title, price, inventory, color } = product;
    const orderPrice = parseFloat( quantity * price ).toFixed( 2 );

    return (
        <div className="single-product">
            <div className='cardDetails' key={id}>
                <div className='cardDetailsImage'></div>
                <div className='cardDetailsInfo'>
                    <h4>{title}</h4><br />
                    <p>Price: {price}<br />
                    Inventory: {inventory}<br />
                    Color: {color}</p>
                    Your order:<br />
                    Quantity: 
                    <NumberInput step={1} value={quantity} min="1" max={inventory} onChange={onQuantityChange} size='md' w='md'>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <br />
                    Price: {orderPrice} <br />
                    {isInBasket ? 
                        <p style={{ color: "red", fontSize: 32 }}>You have this product in the basket</p> : 
                        
                        <Button variant='solid' colorScheme='blue' onClick={onAddToBasket}>
                            Add to basket
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}
