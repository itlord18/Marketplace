import { useState, useEffect } from 'react';
import { useGetBasketProductsQuery, useGetBasketProductQuery, useAddBasketProductMutation, useUpdateBasketProductMutation, useGetProductQuery } from './productsApi';

export function useBasket() {
    const [selectedBasketProductId, setSelectedBasketProductId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addProduct] = useAddBasketProductMutation();
    const [updateProduct] = useUpdateBasketProductMutation();
    const { data: basketData = [] } = useGetBasketProductsQuery();
    const { data: basketProductData = [] } = useGetBasketProductQuery(selectedBasketProductId, {
        skip: !selectedBasketProductId
    });
    const [selectedProductIdForBasket, setSelectedProductIdForBasket] = useState(null);
    const { data: productDataForBasket = [] } = useGetProductQuery(selectedProductIdForBasket, {
        skip: !selectedProductIdForBasket
    });

    useEffect(() => {
        if (selectedBasketProductId && basketProductData.quantity) {
            setQuantity(basketProductData.quantity);
        }
    }, [basketProductData, selectedBasketProductId]);

    const handleAddToBasket = async (id, title, price, quantity, color) => {
        await addProduct({
            id,
            title,
            price,
            quantity,
            color
        });
        setQuantity(1);
    };

    const handleUpdateBasket = async (id, title, price, quantity, color) => {
        await updateProduct({
            id,
            title,
            price,
            quantity,
            color
        });
    };

    const handleGetBasketProduct = async (id) => {
        setSelectedBasketProductId(id);
        setSelectedProductIdForBasket(id);
    };

    

    return {
        basketData,
        basketProductData,
        selectedBasketProductId,
        productDataForBasket,
        quantity,
        setQuantity,
        handleAddToBasket,
        handleUpdateBasket,
        handleGetBasketProduct,
        setSelectedBasketProductId
    };
}
