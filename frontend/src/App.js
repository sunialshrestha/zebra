import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceorderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import PostListScreen from './screens/PostListScreen'
import PostScreen from './screens/PostScreen'
import PostEditScreen from './screens/PostEditScreen'
import PostCreateScreen from './screens/PostCreateScreen'
import Dashboard from './components/dashboard/Dashboard'
import Dash from './components/Designer/Dash'
import ImgEditor from './components/ImgEditor'
import FileManagerScreen from './screens/FileManagerScreen'

import DesignsScreen from './screens/ProductBase/DesignsScreen'
import DesignCanvas from './components/FabricDesign/DesignCanvas'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />

          <Route path='/shipping' component={ShippingScreen} exact />
          <Route path='/shipping/:orderId' component={ShippingScreen} exact />

          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceorderScreen} />

          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />

          <Route path='/admin/product/:id/Edit' component={ProductEditScreen} />

          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />

          <Route path='/admin/orderlist' component={OrderListScreen} />

          <Route path='/admin/postlist' component={PostListScreen} exact />
          <Route
            path='/admin/postlist/:pageNumber'
            component={PostListScreen}
            exact
          />
          <Route path='/post/:id' component={PostScreen} />

          <Route path='/admin/post/:id/Edit' component={PostEditScreen} />
          <Route path='/admin/post/Create' component={PostCreateScreen} />

          <Route path='/search/:keyword' component={HomeScreen} exact />

          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />

          <Route path='/design' component={Dashboard} />
          <Route path='/image-editor' component={ImgEditor} />
          <Route path='/designer/dash' component={Dash} />
          <Route path='/admin/filemanager' component={FileManagerScreen} />

          <Route path='/designscreen' component={DesignsScreen} />

          <Route path='/designfabric' component={DesignCanvas} />

          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
