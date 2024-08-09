import { useGetProductsQuery, useAddBasketProductMutation, useGetProductQuery, useGetBasketProductsQuery, useGetBasketProductQuery, useUpdateBasketProductMutation } from './productsApi';
import './shop.css';
import { FaShoppingBasket, FaHome } from 'react-icons/fa';
import { useState } from "react";

export function Shop() {
    const {data = []} = useGetProductsQuery();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const { data: productData = {} } = useGetProductQuery(selectedProductId, {
        skip: !selectedProductId 
    });
    const [quantity, setQuantity] = useState(1);
    const [addProduct] = useAddBasketProductMutation();
    const { data: basketData = [] } = useGetBasketProductsQuery();
    const [selectedBasketProductId, setSelectedBasketProductId] = useState(null);
    const { data: basketProductData = {} } = useGetBasketProductQuery(selectedBasketProductId, {
        skip: !selectedBasketProductId 
    }); 
    const [updateProduct] =useUpdateBasketProductMutation();
    const [isBasketVisible, setIsBasketVisible] = useState(false);
    const isProductInBasket = basketData.some(item => item.id === selectedProductId);
    

    const handleAddToBasket = async (id, title, price) => {
        await addProduct({
            id: id,
            title: title,
            price: price,
            quantity: quantity
        });
        setQuantity(1);
    };

    const handleUpdateBasket = async (id, title, price) => {
        await updateProduct({
            id: id,
            title: title,
            price: price,
            quantity: quantity
        });
        
    };

    const handleGetProduct = async(id) => {
        await setSelectedProductId(id);
    };
    const handleGetBasketProduct = async(id) => {
        await setSelectedBasketProductId(id);
        setSelectedProductId(null);
    };

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
        setSelectedProductId(null);
        setSelectedBasketProductId(null);
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
                    data.map(item => (
                        <div className='card' key={item.id} onClick={() => handleGetProduct(item.id)}>
                            <div className='cardImage'></div>
                            <div className='cardInfo'>
                                <h4>{item.title}</h4><br />
                                <p>Price: {item.price}<br />
                                Inventory: {item.inventory}</p>
                            </div>
                        </div>
                    ))
                ) : selectedProductId ? (
                    <div className='cardDetails' key={productData.id}>
                        <div className='cardDetailsImage'></div>
                        <div className='cardDetailsInfo'>
                            <h4>{productData.title}</h4><br />
                            <p>Price: {productData.price}<br />
                            Inventory: {productData.inventory}</p>
                            Your order:<br />
                            Quantity: <input type="number" value={quantity} min="1" max={productData.inventory} onChange={handleQuantityChange}/><br />
                            Price: {parseFloat(quantity * productData.price).toFixed(2)} <br />
                            {isProductInBasket ? <p style={{color: "red",fontSize: 32,}}>You have this product in the basket</p> : <button onClick={() => handleAddToBasket(productData.id, productData.title, quantity * productData.price)}> Add to Basket</button>}
                        </div>
                    </div>
                ): (
                    <div className='cardDetails' key={basketProductData.id}>
                        <div className='cardDetailsImage'></div>
                        <div className='cardDetailsInfo'>
                            <h4>{basketProductData.title}</h4><br />
                            Your order:<br />
                            Quantity: {basketProductData.quantity}<br />
                            Price: {basketProductData.quantity * (basketProductData.price / basketProductData.quantity)} <br />
                            <button onClick={() => handleUpdateBasket(basketProductData.id, basketProductData.title, basketProductData.quantity * productData.price)}>Change order</button>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="basket" style={isBasketVisible ? {backgroundColor: "aquamarine"} : {backgroundColor: "white"}}>
                <b>Basket</b>
                { isBasketVisible? ( basketData.length > 0 ? basketData.map(item => (
                    <div className='card' key={item.id} onClick={() => handleGetBasketProduct(item.id)}>
                        <div className='cardImage'></div>
                        <div className='cardInfo'>
                            <h4>{item.title}</h4><br />
                            <p>Price: {item.price}<br />
                            Quantity: {item.quantity}</p>
                        </div>
                    </div>
                )) : <p></p>) : <p></p> } 
            </div>
            <div className="footer"></div>
        </div>
    );
}

export default Shop;
