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
        const newItem=action.payload;
        const existItem=state.cart.cartItems.find(
            (item) =>item._id===newItem._id
            );
            const cartItems=existItem ?state.cart.cartItems.map((item) =>item._id===existItem._id ? newItem:item
            ):[...state.cart.cartItems,newItem];
            return {...state, cart :{...state.cart,cartItems}};
      
      default:
        return state;
    }
  };



export default function StoreProvider(props){
    const [state,dispatch]= useReducer(reducer,initialState);
    const value={state,dispatch};
    return <StoreContext.Provider value={value}>{props.children}</StoreContext.Provider>



}
