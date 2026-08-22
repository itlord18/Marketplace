"use client";

import '../../shop.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useProducts } from '../../components/useProducts';
import { useBasket } from '../../components/useBasket';
import { useFilters } from '../../components/useFilters';
import { ProductCard } from '../../components/productCard';
import { BasketProductCard } from '../../components/basketProductCard';
import { ProductDetails } from '../../components/productDetails';
import { BasketDetails } from '../../components/basketProductDetails';
import { Filters } from '../../components/filters';
import { setQuantity, resetQuantity } from '../../store/quantitySlice';
import { Pagination } from "../../components/pagination";
import { Header } from "../../components/header";
import { Footer } from '../../components/footer';
import { useTranslation } from '../../i18n/index';
import React from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Language } from "../../i18n/settings";
import { sumPrices } from '../../../utils/currency';

interface ShopProps {
  lng: Language;
}

export const Shop = ({ lng }: ShopProps) => {
  const { t, i18n } = useTranslation(lng);
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((state) => state.quantity.value);

  const {
    setSelectedColors,
    setSelectedTypes,
    sort,
    setSort,
    handleElementChange,
    currentPage,
    itemsPerPage,
    handlePageChange,
    selectedColors,
    selectedTypes,
    setSelectedProductIdQuery,
    clearAllFilters
  } = useFilters();

  const { 
    products, 
    productData, 
    selectedProductId, 
    setSelectedProductId, 
    selectProduct, 
    productsColors, 
    productsTypes 
  } = useProducts();
  
  const { 
    basketData, 
    basketProductData, 
    productDataForBasket, 
    selectedBasketProductId, 
    handleAddToBasket, 
    handleUpdateBasket, 
    handleGetBasketProduct, 
    setSelectedBasketProductId, 
    handleDeleteProduct 
  } = useBasket();
  
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  const isProductInBasket = useMemo(() => {
    return basketData.some((item) => item.id === selectedProductId);
  }, [basketData, selectedProductId]);

 
  useEffect(() => {
    if (selectedBasketProductId) {
      setSelectedProductId(null);
    }
  }, [selectedBasketProductId, setSelectedProductId]);

  
  useEffect(() => {
    if (selectedProductId) {
      setSelectedProductIdQuery(selectedProductId);
    } else if (!selectedBasketProductId) {
      setSelectedProductIdQuery(null);
    }
  }, [selectedProductId, selectedBasketProductId, setSelectedProductIdQuery]);

  const inventory = selectedProductId
    ? productData?.inventory ?? 0
    : productDataForBasket?.inventory ?? 0;

  const handleQuantityChange = useCallback((value: number) => {
    const val = value || 1;
    if (val >= 1 && val <= inventory) {
      dispatch(setQuantity(val));
    }
  }, [inventory, dispatch]);

  const toggleBasketVisibility = useCallback(() => {
    setIsBasketVisible(prev => !prev);
    if (!isBasketVisible) {
      dispatch(resetQuantity());
    }
  }, [isBasketVisible, dispatch]);

  

const handleHomeClick = useCallback(() => {
    console.log("🏠 Вы нажали кнопку домой!!!");
    
    selectProduct(null);           
    setSelectedBasketProductId(null); 
    dispatch(resetQuantity());      
    
    clearAllFilters();
    
}, [selectProduct, setSelectedBasketProductId, dispatch, clearAllFilters]);

  const totalPages = useMemo(() => {
    return Math.ceil(products.length / itemsPerPage);
  }, [products.length, itemsPerPage]);

  const currentProducts = useMemo(() => {
    return products.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [products, currentPage, itemsPerPage]);


  const totalBasketPrice = useMemo(() => {
    const prices = basketData.map(item => item.price);
    return sumPrices(prices);
  }, [basketData]);
  console.log("i18n: " + i18n);

  // Показываем лоадер только если НЕ гидратировано ИЛИ переводы не готовы
  if (!i18n) {
  return <div>Loading translations...</div>;
}

  console.log("productDataForBasket:    " + productDataForBasket);


  return (
    <div className="container">
      <Header 
        homeLink={handleHomeClick}
        basketLink={toggleBasketVisibility}
        t={t}
      />

      <div className="menu"></div>

      {!selectedProductId && !selectedBasketProductId ? (
        <div className="content">
          <Filters
            sort={sort}
            setSort={setSort}
            productsColors={productsColors}
            productsTypes={productsTypes}
            selectedColors={selectedColors}
            selectedTypes={selectedTypes}
            handleColorChange={(color) => handleElementChange(color, setSelectedColors)}
            handleTypeChange={(type) => handleElementChange(type, setSelectedTypes)}
          />

          <div className="products">
            {currentProducts.map((item) => (
              <ProductCard key={item.id} product={item} onSelect={selectProduct} t={t} />
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      ) : selectedProductId ? (
        <ProductDetails
          product={productData}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onAddToBasket={() =>
            handleAddToBasket(
              productData.id,
              productData.title,
              Number((quantity * productData.price).toFixed(2)),
              quantity,
              productData.color
            )
          }
          isInBasket={isProductInBasket}
          t={t}
          selectProduct={selectProduct}
        />
      ) : (
        <BasketDetails
          basketProduct={basketProductData}
          productForBasket={productDataForBasket}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onUpdateBasket={(id, title, orderPrice, quantity, color) => {
            handleUpdateBasket(id, title, orderPrice, quantity, color);
          }}
          onDeleteProduct={handleDeleteProduct}
          t={t}
          selectProduct={selectProduct}
        />
      )}

      <div className="basket" style={{ backgroundColor: isBasketVisible ? "aquamarine" : "white" }}>
        {isBasketVisible && (
          basketData.length > 0 ? (
            <>
            {basketData.map((item) => (
              <BasketProductCard 
                key={item.id} 
                product={item} 
                handleGetBasketProduct={handleGetBasketProduct} 
                onDeleteProduct={handleDeleteProduct} 
                t={t} 
              />
            )
          )
        }
        <div className="basket-total">
            <strong>Total Price: {totalBasketPrice}</strong>
          </div>
          </>
            
            
          ) : (
            <p>No products in the basket.</p>
          )
        )}
      </div>

      <div className="footer">
        <Footer lng={lng} />
      </div>
    </div>
  );
};

export default Shop;