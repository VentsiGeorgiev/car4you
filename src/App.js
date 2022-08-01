import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Layout from "./components/Header/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Explore from "./pages/Explore/Explore";
import Offers from "./pages/Offers/Offers";
import Category from "./pages/Category/Category";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import CreateListing from "./pages/CreateListing/CreateListing";
import Listing from "./pages/Listing/Listing";
import Contact from "./pages/Contact/Contact";


function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Explore />}></Route>
          <Route path="/offers" element={<Offers />}></Route>
          <Route path="/category/:categoryName" element={<Category />}></Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/create-listing" element={<CreateListing />}></Route>
          <Route path="/category/:categoryName/:listingId" element={<Listing />}></Route>
          <Route path="/contact/:ownerId" element={<Contact />}></Route>
        </Routes>
      </Layout>
      <ToastContainer />
    </>

  );
}

export default App;
