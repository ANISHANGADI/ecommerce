import "./App.css";
import Header from "./component/layout/Header.jsx";
import Footer from "./component/layout/Footer.jsx";
import Home from "./component/Home.jsx";
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import ProductDetails from "./component/products/ProductDetails.jsx";
import Login from "./component/auth/Login.jsx";
import Register from "./component/auth/Register.jsx";
import Profile from "./component/user/Profile.jsx";
import Cart from "./component/cart/Cart.jsx";
import Shipping from "./component/cart/Shipping.jsx";
import ConfirmOrder from "./component/cart/ConfirmOrder.jsx";
import PaymentMethod from "./component/cart/PaymentMethod.jsx";
import useAdminRoutes from "./component/routes/adminRoutes.jsx"
import { Toaster } from "react-hot-toast";
function App() {
  const adminRoutes = useAdminRoutes();
  return (
    <Router>
    <div className="App">
    <Toaster position="top-center" />
      <Header />

      <div className="container">
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
         <Route path="/profile" element={<Profile/>}/> 
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/shipping" element={<Shipping/>}/>
         <Route path="/confirm_order" element={<ConfirmOrder/>}/>
         <Route
              path="/payment_method"
              element={
                
                  <PaymentMethod />
               
              }
            />
             {adminRoutes} 
        </Routes>

      </div>

      <Footer />
    </div>
    </Router>
  );
}

export default App;
