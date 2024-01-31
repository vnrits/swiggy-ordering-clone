import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Private from "./pages/user/Private";
import FeaturedRestaurantPage from "./pages/FeaturedRestaurantPage";
import IndividualRestaurant from "./pages/IndividualRestaurant";
import Admin from "./pages/admin/Admin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllOrders from "./pages/admin/AllOrders";
import AddProducts from "./pages/admin/AddProducts";
import AllRestaurants from "./pages/admin/AllRestaurants";
import Dashboard from "./pages/user/Dashboard";
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import { UserContext } from "./utils/userContext";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/private" element={<Private />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/restaurants" element={<FeaturedRestaurantPage />} />
          <Route exact path="/restaurants/:name" element={<IndividualRestaurant />} />

          {/* ----------------------- ADMIN ROUTES -------------------------- */}
          <Route exact path="/admin" element={<ProtectedAdminRoute element={Admin} />}>
            <Route exact path="/admin/admin-dashboard" element={<AdminDashboard />} />
            <Route exact path="/admin/all-orders" element={<AllOrders />} />
            <Route exact path="/admin/add-products" element={<AddProducts />} />
            <Route exact path="/admin/all-restaurants" element={<AllRestaurants />} />
          </Route>
          {/* ----------------------- ADMIN ROUTES -------------------------- */}

          {/* ----------------------- USER ROUTES -------------------------- */}
          <Route exact path="private" element={<ProtectedUserRoute element={Private} />}>
            <Route exact path="/private/dashboard" element={<ProtectedUserRoute element={Dashboard} />} />
          </Route>
          {/* ----------------------- USER ROUTES -------------------------- */}

        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
