import react from "react";
import "./App.css";
import Invoice from "./Components/Invoice/Invoice";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Components/Dashboard/Dashboard';
import { AuthProvider, useAuth } from './Components/Authentification/AuthContext';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "./Components/Login/Login";
import { ToastContainer } from "react-toastify";

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();
  return user!=null ? element : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
        <ToastContainer /> {/* Add ToastContainer here */}
      </Router>
    </AuthProvider>
  );
}

export default App;
