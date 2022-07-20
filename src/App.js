import Layout from "./components/Header/Layout";

import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore/Explore";
import Offers from "./pages/Offers/Offers";
import Profile from "./pages/Profile/Profile";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Explore />}></Route>
        <Route path="/offers" element={<Offers />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
