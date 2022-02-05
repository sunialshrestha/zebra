import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Jwt } from 'jsonwebtoken'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from './reducers/orderReducers'
import {
  postListReducer,
  postDetailsReducer,
  postDeleteReducer,
  postCreateReducer,
  postUpdateReducer,
} from './reducers/postReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productTopRated: productTopReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  postList: postListReducer,
  postDetails: postDetailsReducer,
  postDelete: postDeleteReducer,
  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
})

const tokenExpired = () => {
  var isExpired = false
  const token = localStorage.getItem('userInfo')
  var decodedToken = Jwt.decode(token, { complete: true })
  var dateNow = new Date()

  if (decodedToken.exp < dateNow.getTime()) isExpired = true
}

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage =
  localStorage.getItem('userInfo') && !tokenExpired
    ? JSON.parse(localStorage.getItem('userInfo'))
    : []

const shippingAdressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : []

const PaymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : []

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAdressFromStorage,
    paymentMethod: PaymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
