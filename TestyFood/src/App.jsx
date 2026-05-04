import { Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import HomePage from "./pages/HomePage"
import FastFoodMenuPage from "./pages/FastFoodMenuPage"
import RestaurantFoodPage from "./pages/RestaurantFoodPage"
import BlogPage from "./pages/BlogPage"
import BlogDetails from "./pages/BlogDetails"
import MyAccount from "./pages/MyAccount"
import ChefList from "./pages/ChefList"
import ChefDetails from "./pages/ChefDetails"
import AboutUs from "./pages/AboutUs"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import ContactUsPage from "./pages/ContactUsPage"
import AuthPage from "./pages/AuthPage"
import FaqPage from "./pages/FaqPage"
import TermsAndConditions from "./pages/TermsAndConditions"
import NotFound from "./components/NotFound"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/fastfoodmenupage" element={<FastFoodMenuPage />} />
          <Route path="/foodlisting" element={<RestaurantFoodPage />} />
          <Route path="/Blogs" element={<BlogPage />} />
          <Route path="/blogdetails" element={<BlogDetails />} />
          <Route path="/blogdetails/:mealId" element={<BlogDetails />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/cheflist" element={<ChefList />} />
          <Route path="/chefdetail" element={<ChefDetails />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/privacy-policy" element={<TermsAndConditions />} />
          <Route path="/notfound" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/forgot-password" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App
