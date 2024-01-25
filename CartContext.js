import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Swal from 'sweetalert2';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProductIndex = state.findIndex(product => product._id === action.payload._id);

      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {

        return [...state, { ...action.payload, quantity: 1 }];
      }

    case 'REMOVE_FROM_CART':
      
      return state.filter(product => product !== action.payload); 

    case 'CLEAR_CART':
      return [];

    case 'INCREMENT_QUANTITY':
      return state.map(product =>
        product._id === action.payload._id ? { ...product, quantity: product.quantity + 1 } : product
      );

    case 'DECREMENT_QUANTITY':
      return state.map(product =>
        product._id === action.payload._id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productToRemove) => {
    
    Swal.fire({
      title: 'Remove item',
      text: 'Are you sure you want to remove this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productToRemove });
        Swal.fire({
          title:'Removed!',
          text:'Your cart item has been removed.',
          timer: 2000,
        position: 'bottom',
          showCancelButton: false,
          showConfirmButton: false
        }
          );
      }
    }); 
   };

  const clearCart = () => {
   
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to clear your cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Clear!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'CLEAR_CART' });
        Swal.fire({
          title:'Cleared!',
          text:'Your cart item has been cleared.',
          timer: 2000,
        position: 'bottom',
          showCancelButton: false,
          showConfirmButton: false
        }
        );
      }
    }); 
  };

  const incrementQuantity = (product) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: product });
    Swal.fire({
       text: "You have changed Quantity " ,
       timer: 2000,
        position: 'bottom-right',
       showCancelButton: false,
       showConfirmButton: false
    }
    );
  };

  const decrementQuantity = (product) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: product });
    Swal.fire({
      text: "You have changed Quantity " ,
      timer: 2000,
      position: 'bottom-right',
      showCancelButton: false,
      showConfirmButton: false
   }
   );
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
