"use client";

import { useGetProductsQuery, useGetProductQuery } from "./productsApi";
import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetQuantity } from "../store/quantitySlice";

export interface Product {
    id: number;
    title: string;
    price: number;
    quantity: number;
    color: string;
    type: string;
    inventory: number;
}

interface UseProductsReturn {
    products: Product[];
    productData: Product;
    selectedProductId: number | null;
    selectProduct: (id: number | null) => void;
    setSelectedProductId: (id: number | null) => void;
    productsColors: string[];
    productsTypes: string[];
}

export function useProducts(): UseProductsReturn {
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    
    const [selectedProductId, setSelectedProductId] = useState<number | null>(() => {
        const id = searchParams.get('productId');
        return id ? parseInt(id) : null;
    });

    
    const apiQuery = useMemo(() => {
        const params = new URLSearchParams();
        
        const colors = searchParams.get('colors');
        const types = searchParams.get('types');
        const sort = searchParams.get('sort');
        
        if (colors) {
            const colorArray = colors.split(',');
            colorArray.forEach(color => {
                params.append('color', color);
            });
        }
        if (types) {
            const typeArray = types.split(',');
            typeArray.forEach(type => {
                params.append('type', type);
            });
        }
        if (sort) {
            const [sortField, order] = sort.split('&').map(p => p.split('=')[1]);
            if (sortField && order) {
                params.set('_sort', sortField);
                params.set('_order', order);
            }
        }
        
        return params.toString();
    }, [searchParams]);

    
    const { data: products = [] } = useGetProductsQuery(apiQuery) as {
        data: Product[];
    };

    
    const { data: allProducts = [] } = useGetProductsQuery("") as {
        data: Product[];
    };

    const { data: productData = {} as Product } = useGetProductQuery(selectedProductId!, {
        skip: !selectedProductId,
    }) as { data: Product };

    const selectProduct = useCallback((id: number | null) => {
        setSelectedProductId(id);
        if (id === null) {
            dispatch(resetQuantity());
        }
    }, [dispatch]);

    const productsColors = useMemo(() => {
        return Array.from(new Set(allProducts.map((x) => x.color).sort()));
    }, [allProducts]);

    const productsTypes = useMemo(() => {
        return Array.from(new Set(allProducts.map((x) => x.type).sort()));
    }, [allProducts]);

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