"use client";

import { useState, useEffect } from "react";
import {
  useGetBasketProductsQuery,
  useGetBasketProductQuery,
  useAddBasketProductMutation,
  useUpdateBasketProductMutation,
  useGetProductQuery,
  useDeleteBasketProductMutation,
} from "./productsApi";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setQuantity, resetQuantity } from "../store/quantitySlice";


// ==== TYPES ====

export interface BasketProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  color: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  inventory: number;
  color: string;
}

export function useBasket() {
  const dispatch = useAppDispatch();

  const quantity = useAppSelector((state) => state.quantity.value);

  const [selectedBasketProductId, setSelectedBasketProductId] = useState<number | null>(null);
  const [selectedProductIdForBasket, setSelectedProductIdForBasket] = useState<number | null>(null);
  

  // ===== RTK QUERY HOOKS =====

  const { data: basketData = [] } = useGetBasketProductsQuery(undefined, {
    
    selectFromResult: (result) => ({
      ...result,
      data: (result.data as BasketProduct[]) ?? [],
    }),
  });

  const { data: basketProductData = {} as BasketProduct} = useGetBasketProductQuery(selectedBasketProductId!, {
    skip: !selectedBasketProductId,
  })as { data: BasketProduct };

  const { data: productDataForBasket = {} as Product } = useGetProductQuery(selectedProductIdForBasket!, {
          skip: !selectedProductIdForBasket,
      }) as { data: Product };

  const [addProduct] = useAddBasketProductMutation();
  const [updateProduct] = useUpdateBasketProductMutation();
  const [deleteProduct] = useDeleteBasketProductMutation();

  // ===== EFFECT: LOAD QUANTITY =====

  useEffect(() => {
    if (selectedBasketProductId && basketProductData && "quantity" in basketProductData) {
      dispatch(setQuantity(basketProductData.quantity));
    }
  }, [basketProductData, selectedBasketProductId, dispatch]);

  // ===== HANDLERS =====

  const handleAddToBasket = async (
    id: number,
    title: string,
    price: number,
    quantity: number,
    color: string
  ) => {
    await addProduct({ id, title, price, quantity, color });
    dispatch(resetQuantity());
  };

  const handleUpdateBasket = async (
    id: number,
    title: string,
    price: number,
    quantity: number,
    color: string
  ) => {
    await updateProduct({ id, title, price, quantity, color });
  };

  const handleGetBasketProduct = (id: number) => {
    setSelectedBasketProductId(id);
    setSelectedProductIdForBasket(id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    dispatch(setQuantity(newQuantity));
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
  };

  

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
    handleDeleteProduct,
  };
}
