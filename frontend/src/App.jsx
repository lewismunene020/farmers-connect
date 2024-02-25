import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Header from "./components/Header";
import CustomerDashboard from "./components/customer/Dashboard";
import FarmerDashboard from "./components/farmer/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
