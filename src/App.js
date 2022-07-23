import Layout from "./components/Header/Layout";

import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore/Explore";
import Offers from "./pages/Offers/Offers";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header/Header";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Explore />}></Route>
        <Route path="/offers" element={<Offers />}></Route>
        <Route path="/profile" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
      </Routes>
    </Layout>

  );
}

export default App;
