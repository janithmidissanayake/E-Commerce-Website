import React, { useReducer } from 'react';
import { createContext } from 'react';

export const StoreContext = createContext();

const initialState = {
    cart:{
        cartItems :[],
    },
};

const reducer = (state, action) => {
    switch (action.type) {
      case "CART_ADD_ITEM":
        return { 
            ...state , 
            cart:
            {...state.cart,
                cartItems:[...state.cart.cartItems, action.payload]
            }  
         };
     
      default:
        return state;
    }
  };



export default function StoreProvider(props){
    const [state,dispatch]= useReducer(reducer,initialState);
    const value={state,dispatch};
    return <StoreContext.Provider value={value}>{props.children}</StoreContext.Provider>



}
