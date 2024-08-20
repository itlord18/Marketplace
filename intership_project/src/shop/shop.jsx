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

export function Shop() {
    const dispatch = useDispatch();
    const quantity = useSelector((state) => state.quantity.quantity);

    const {
        setSelectedColors, 
        setSelectedTypes, 
        sort, 
        setSort, 
        querySum, 
        handleColorChange, 
        handleTypeChange
    } = useFilters();
    
    const { products, productData, selectedProductId, setSelectedProductId, selectProduct, productsColors, productsTypes } = useProducts();
    const { basketData, basketProductData, productDataForBasket, selectedBasketProductId, handleAddToBasket, handleUpdateBasket, handleGetBasketProduct, setSelectedBasketProductId } = useBasket();
    const [isBasketVisible, setIsBasketVisible] = useState(false);

    const isProductInBasket = basketData.some(item => item.id === selectedProductId);

    useEffect(() => {
        if (selectedBasketProductId) {
            setSelectedProductId(null);
        }
    }, [selectedBasketProductId]);

    const inventory = selectedProductId ? productData.inventory : productDataForBasket.inventory;
    
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= inventory) {
            dispatch(setQuantity(value));
        }
    };

    const toggleBasketVisibility = () => {
        setIsBasketVisible(!isBasketVisible);
        if (!isBasketVisible) {
            dispatch(resetQuantity()); 
        }
    };

    const handleHomeClick = () => {
        selectProduct(null);
        setSelectedBasketProductId(null);
        dispatch(resetQuantity());  
        setSelectedTypes([]);
        setSelectedColors([]);
        setSort('');
        querySum();
    };

    return (
        <div className="container">
            <div className="header">
                <FaHome className="home-icon" onClick={handleHomeClick} />
                <FaShoppingBasket className="basket-icon" onClick={toggleBasketVisibility} />
            </div>
            <div className="menu"></div>

            {!selectedProductId && !selectedBasketProductId ? (
                <div className="content">
                    <Filters
                        sort={sort}
                        setSort={setSort}
                        productsColors={productsColors}
                        productsTypes={productsTypes}
                        handleColorChange={handleColorChange}
                        handleTypeChange={handleTypeChange}
                        querySum={querySum}
                    />
                    
                    <div className='products'>
                        {products.map(item => (
                            <ProductCard key={item.id} product={item} onSelect={selectProduct} />
                        ))}
                    </div>
                </div>
            ) : selectedProductId ? (
                <ProductDetails
                    product={productData}
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    onAddToBasket={() => handleAddToBasket(productData.id, productData.title, parseFloat(quantity * productData.price).toFixed(2), quantity, productData.color)}
                    isInBasket={isProductInBasket}
                />

            ) : (
                <BasketDetails
                    basketProduct={basketProductData}
                    productForBasket={productDataForBasket}
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    onUpdateBasket={handleUpdateBasket}
                />
            )}

            <div className="basket" style={isBasketVisible ? {backgroundColor: "aquamarine"} : {backgroundColor: "white"}}>
                <b>Basket</b>
                {isBasketVisible ? (
                    basketData.length > 0 ? basketData.map(item => (
                        <BasketProductCard key={item.id} product={item} handleGetBasketProduct={handleGetBasketProduct} />
                    )) : <p>Your basket is empty.</p>
                ) : null}
            </div>
            <div className="footer"></div>
        </div>
    );
}

export default Shop;
