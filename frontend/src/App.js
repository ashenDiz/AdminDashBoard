import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import Registerscreen from "./components/RegisterScreen";
import UserProfile from "./components/UserProfile";
import Dashboard from "./components/Dashboard";
import InvoiceForm from "./components/InvoiceForm";
import GrmmerChecker from "./components/GrammerCheck/CheckerDemo";
import { ToastContainer } from "react-toastify";

// Layout component to conditionally render header and footer
function Layout({ children }) {
  const location = useLocation();

  // Define an empty array of paths since Header and Footer are removed
  const showHeaderFooterPaths = [];

  // Check if the current path is included in the array
  const showHeaderFooter = showHeaderFooterPaths.includes(location.pathname);

  // Render layout
  return (
    <div className="App">
      {showHeaderFooter && <Header />} {/* Removed since Header is no longer used */}
      {children}
      {showHeaderFooter && <Footer />} {/* Removed since Footer is no longer used */}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/invoiceform" element={<InvoiceForm />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/grammercheck" element={<GrmmerChecker />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
