import './shop.css';
import { FaShoppingBasket, FaHome } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useProducts } from './useProducts';
import { useBasket } from './useBasket';
import { useFilters } from './useFilters';
import { ProductCard } from './productCard';
import { BasketProductCard } from './basketProductCard';
import { ProductDetails } from './productDetails';
import { BasketDetails } from './basketProductDetails';
import { Filters } from './filters';
import { useSelector, useDispatch } from 'react-redux'; 
import { setQuantity, resetQuantity } from '../store/quantitySlice';
import { Pagination } from "./pagination";
import { Header } from "./header";
import React from 'react';

export function Shop() {
    const dispatch = useDispatch();
    const quantity = useSelector( ( state ) => state.quantity.quantity );

    const {
        setSelectedColors, 
        setSelectedTypes, 
        sort, 
        setSort,
        handleElementChange,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        handlePageChange,
        selectedColors,
        selectedTypes
    } = useFilters();
    
    const { products, productData, selectedProductId, setSelectedProductId, selectProduct, productsColors, productsTypes } = useProducts();
    const { basketData, basketProductData, productDataForBasket, selectedBasketProductId, handleAddToBasket, handleUpdateBasket, handleGetBasketProduct, setSelectedBasketProductId, handleDeleteProduct } = useBasket();
    const [ isBasketVisible, setIsBasketVisible ] = useState( false );

    const isProductInBasket = basketData.some( item => item.id === selectedProductId );

    useEffect( () => {
        if ( selectedBasketProductId ) {
            setSelectedProductId( null );
        }
    }, [ selectedBasketProductId ] );

    const inventory = selectedProductId ? productData.inventory : productDataForBasket.inventory;
    
    const handleQuantityChange = ( valueAsNumber ) => {
        const value = valueAsNumber || 1;
        if ( value >= 1 && value <= inventory ) {
            dispatch( setQuantity( value ) );
        }
    };
    

    const toggleBasketVisibility = () => {
        setIsBasketVisible( !isBasketVisible );
        if ( !isBasketVisible ) {
            dispatch( resetQuantity() ); 
        }
    };

    const handleHomeClick = () => {
        selectProduct( null );
        setSelectedBasketProductId( null );
        dispatch( resetQuantity() );  
        setSelectedTypes( [] );
        setSelectedColors( [] );
        setSort( '' );
        setCurrentPage( 1 );
        
    };
    
    
    const totalPages = Math.ceil( products.length / itemsPerPage );

    const currentProducts = products.slice(
        ( currentPage - 1 ) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container">
            
            <Header 
                homeLink={handleHomeClick}
                basketLink={toggleBasketVisibility}
            />
                <FaHome className="home-icon" onClick={handleHomeClick} />
                
                <FaShoppingBasket className="basket-icon" onClick={toggleBasketVisibility} />
            
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
                        handleColorChange={( color ) => handleElementChange( color, setSelectedColors )}
                        handleTypeChange={( type ) => handleElementChange( type, setSelectedTypes )}
                    />
                    
                    <div className='products'>
                        {currentProducts.map( item => (
                            <ProductCard key={item.id} product={item} onSelect={selectProduct} />
                        ) )}
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
                    onAddToBasket={() => handleAddToBasket( productData.id, productData.title, parseFloat( quantity * productData.price ).toFixed( 2 ), quantity, productData.color )}
                    isInBasket={isProductInBasket}
                />

            ) : (
                <BasketDetails
                    basketProduct={basketProductData}
                    productForBasket={productDataForBasket}
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    onUpdateBasket={handleUpdateBasket}
                    onDeleteProduct={handleDeleteProduct}
                />
            )}

            <div className="basket" style={isBasketVisible ? { backgroundColor: "aquamarine" } : { backgroundColor: "white" }}>
                {isBasketVisible ? (
                    basketData.length > 0 ? basketData.map( item => (
                        <BasketProductCard key={item.id} product={item} handleGetBasketProduct={handleGetBasketProduct} onDeleteProduct={handleDeleteProduct}/>
                    ) ) : <p></p>
                ) : null}
            </div>
            <div className="footer"></div>
        </div>
    );
}

export default Shop;
