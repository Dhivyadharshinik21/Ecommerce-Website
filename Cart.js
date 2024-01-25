import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './Cart.css'

function Cart() {
  const { cart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useCart();

  const handleRemoveFromCart = (productToRemove) => {  
    removeFromCart(productToRemove);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1 className='cart_title'>Shopping Cart</h1>
      <br></br>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map((product) => (
          <li key={product._id} style={{ borderBottom: '1px solid #ccc', padding: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '20px' }}>
              <img src={product.image} alt={product.title} style={{ maxWidth: '200px', height: 'auto' }} />
            </div>
            <div>
              <p>{product.title}</p>
              <p>Price: ₹{product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Total: ₹{product.price * product.quantity}</p>
            
                <div className="cart-item-buttons">
            <button className="remove-button" onClick={() => handleRemoveFromCart(product)}>
              Remove
            </button>
            <div>
            <button className="quantity-button1" onClick={() => decrementQuantity(product)}>
              -
            </button>
            <button className="quantity-button">{product.quantity}</button>
            <button className="quantity-button2" onClick={() => incrementQuantity(product)}>
              +
            </button>
            </div>
          </div>
            </div>
          </li>
        ))}
      </ul>
      <div >
        <p>Total Price: ₹{cart.reduce((total, product) => total + product.price * product.quantity, 0)}</p>
      </div>
      <Button onClick={handleClearCart} >Clear Cart</Button>
      
    </div>
  );
};

export default Cart
