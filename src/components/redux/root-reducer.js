import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user-reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig={
    key:'root',                        /*it means we want to store state from root of that reducer*/
    storage,
    whitelist:['cart']                /*cart is the reducer which we want to persist*/
};

const rootReducer=combineReducers({
    user:userReducer,
    cart:cartReducer,
    directory:directoryReducer,
    shop:shopReducer
});

export default  persistReducer(persistConfig,rootReducer);
/* persistReducer actually wrap rootReducer and give it to the persistStore which store it into the local storage 
and when we refresh the page the local storage retrive our past data for us*/