import { useGetProductsQuery, useGetProductQuery } from './productsApi';
import { useState } from 'react';

export function useProducts() {
    const { data: products = [] } = useGetProductsQuery();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const { data: productData = {} } = useGetProductQuery(selectedProductId, {
        skip: !selectedProductId 
    });

    const selectProduct = (id) => setSelectedProductId(id);

    return {
        products,
        productData,
        selectedProductId,
        selectProduct,
    };
}
