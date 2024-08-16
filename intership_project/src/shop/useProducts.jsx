import { useGetProductsQuery, useGetProductQuery } from './productsApi';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useProducts() {
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let queryFromURL = '';

    if (queryParams.toString()) {
        queryFromURL = queryParams.toString();
    }

    const { data: products = [] } = useGetProductsQuery(queryFromURL);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const { data: productData = {} } = useGetProductQuery(selectedProductId, {
        skip: !selectedProductId 
    });

    const selectProduct = (id) => setSelectedProductId(id);

    const productsColors = Array.from(new Set(products.map((x) => x.color).sort()));
    const productsTypes = Array.from(new Set(products.map((x) => x.type).sort()));

    return {
        products,
        productData,
        selectedProductId,
        selectProduct,
        setSelectedProductId,
        productsColors,
        productsTypes,
    };
}
