import { useGetBasketProductsQuery, useGetBasketProductQuery, useAddBasketProductMutation, useUpdateBasketProductMutation } from './productsApi';
import { useState } from 'react';

export function useBasket() {
    const { data: basketProducts = [] } = useGetBasketProductsQuery();
    const [selectedBasketProductId, setSelectedBasketProductId] = useState(null);
    const { data: basketProductData = {} } = useGetBasketProductQuery(selectedBasketProductId, {
        skip: !selectedBasketProductId 
    });
    const [addProductToBasket] = useAddBasketProductMutation();
    const [updateProductInBasket] = useUpdateBasketProductMutation();
    
    const selectBasketProduct = (id) => setSelectedBasketProductId(id);
    const addToBasket = (product) => addProductToBasket(product);
    const updateBasket = (product) => updateProductInBasket(product);

    return {
        basketProducts,
        basketProductData,
        selectedBasketProductId,
        selectBasketProduct,
        addToBasket,
        updateBasket,
    };
}
