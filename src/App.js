import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Layout from "./components/Header/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Explore from "./pages/Explore/Explore";
import Offers from "./pages/Offers/Offers";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";


function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Explore />}></Route>
          <Route path="/offers" element={<Offers />}></Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Routes>
      </Layout>
      <ToastContainer />
    </>

  );
}

export default App;
