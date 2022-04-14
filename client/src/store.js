import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productReducer,
  singleProductReducer,
} from './Redux/reducers/productReducer';
import {
  forgotPassword,
  profileReducer,
  userReducer,
} from './Redux/reducers/userReducer';
import { cartReducer } from './Redux/reducers/cartReducer';

const reducer = combineReducers({
  products: productReducer,
  singleProduct: singleProductReducer,
  auth: userReducer,
  profileDetails: profileReducer,
  forgot: forgotPassword,
  cart: cartReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
