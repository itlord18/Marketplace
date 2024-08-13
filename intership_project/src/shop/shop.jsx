import './shop.css';
import { FaShoppingBasket, FaHome } from 'react-icons/fa';
import { useProducts } from './useProducts';
import { useBasket } from './useBasket';
import { ProductCard } from './productCard';
import { ProductDetails } from './productDetails';
import { BasketDetails } from './basketDetails';
import { useState } from 'react'

export function Shop() {
    const { products, productData, selectedProductId, selectProduct } = useProducts();
    const { basketProducts, basketProductData, selectedBasketProductId, selectBasketProduct, addToBasket, updateBasket } = useBasket();
    const [quantity, setQuantity] = useState(1);
    const [isBasketVisible, setIsBasketVisible] = useState(false);

    const isProductInBasket = basketProducts.some(item => item.id === selectedProductId);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= productData.inventory) {
            setQuantity(value);
        }
    };

    const toggleBasketVisibility = () => {
        setIsBasketVisible(!isBasketVisible);
    };

    const handleHomeClick = () => {
        selectProduct(null);
        selectBasketProduct(null);
        setQuantity(1);
    };
    

    

    return (
        <div className="container">
            <div className="header">
                <FaHome className="home-icon" onClick={handleHomeClick} />
                <FaShoppingBasket className="basket-icon" onClick={toggleBasketVisibility} />
            </div>
            <div className="menu"></div>
            
            <div className={selectedProductId || selectedBasketProductId ? "single-product" : "content"}>
                {!selectedProductId && !selectedBasketProductId ?  (
                     products.map(item => (
                        <ProductCard key={item.id} product={item} onSelect={selectProduct} />
                    ))
                ) : selectedProductId ? (
                    <ProductDetails
                        product={productData}
                        quantity={quantity}
                        onQuantityChange={handleQuantityChange}
                        onAddToBasket={() => addToBasket({ id: productData.id, title: productData.title, price: parseFloat(quantity * productData.price).toFixed(2), quantity })}
                        isInBasket={isProductInBasket}
                    />
                ): (
                    <BasketDetails
                    basketProduct={basketProductData}
                    onUpdateBasket={() => updateBasket({ id: basketProductData.id, title: basketProductData.title, price: basketProductData.price, quantity: basketProductData.quantity })}
                />
                )}
            </div>
            
            <div className="basket" style={isBasketVisible ? {backgroundColor: "aquamarine"} : {backgroundColor: "white"}}>
                <b>Basket</b>
                {isBasketVisible ? (
                    basketProducts.length > 0 ? basketProducts.map(item => (
                        <ProductCard key={item.id} product={item} onSelect={selectBasketProduct} />
                    )) : <p>Your basket is empty.</p>
                ) : null}
            </div>
            <div className="footer"></div>
        </div>
    );
}

export default Shop;
