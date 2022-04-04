import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productReducer,
  singleProductReducer,
} from './Redux/reducers/productReducer';
import { userReducer } from './Redux/reducers/userReducer';

const reducer = combineReducers({
  products: productReducer,
  singleProduct: singleProductReducer,
  auth: userReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
