import { useState, useEffect } from 'react';
import { useGetBasketProductsQuery, useGetBasketProductQuery, useAddBasketProductMutation, useUpdateBasketProductMutation, useGetProductQuery, useDeleteBasketProductMutation } from './productsApi';
import { useSelector, useDispatch } from 'react-redux';
import { setQuantity, resetQuantity } from '../store/quantitySlice';

export function useBasket() {
    const dispatch = useDispatch();
    
    const quantity = useSelector((state) => state.quantity.value);
    
    const [selectedBasketProductId, setSelectedBasketProductId] = useState(null);
    const [addProduct] = useAddBasketProductMutation();
    const [updateProduct] = useUpdateBasketProductMutation();
    const [deleteProduct] = useDeleteBasketProductMutation();
    
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
            dispatch(setQuantity(basketProductData.quantity));
        }
    }, [basketProductData, selectedBasketProductId, dispatch]);

    const handleAddToBasket = async (id, title, price, quantity, color) => {
        await addProduct({
            id,
            title,
            price,
            quantity,
            color
        });
        dispatch(resetQuantity());
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

    const handleQuantityChange = (newQuantity) => {
        dispatch(setQuantity(newQuantity));
    };

    const handleDeleteProduct = async(id) => {
        await deleteProduct(id);
    }

    return {
        basketData,
        basketProductData,
        selectedBasketProductId,
        productDataForBasket,
        quantity,
        handleQuantityChange,
        handleAddToBasket,
        handleUpdateBasket,
        handleGetBasketProduct,
        setSelectedBasketProductId,
        handleDeleteProduct
    };
}
