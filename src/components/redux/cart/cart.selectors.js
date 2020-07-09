import {createSelector} from 'reselect';

// input Selector that take state and return slice of state and does not nedd createSelector
const selectCart=state => state.cart;

// output selector that use input and createSelector
export const selectCartItems=createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden=createSelector(
    [selectCart],
    cart=> cart.hidden
);

//count cartItems
export const selectCartItemsCount=createSelector(
    [selectCartItems],
    cartItems => 
         cartItems.reduce(
        (accumalatedQuantity,cartItem) => accumalatedQuantity + cartItem.quantity,0
    )
);

//Total
export const selectCartTotal=createSelector(
    [selectCartItems],
    cartItems => 
    cartItems.reduce(
   (accumalatedQuantity,cartItem) => accumalatedQuantity + cartItem.quantity * cartItem.price,0
)
)