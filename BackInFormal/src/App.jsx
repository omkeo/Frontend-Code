import react from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Components/Dashboard/Dashboard';
import { AuthProvider, useAuth } from './Components/Contexts/AuthContext';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Components/Login/Login";
import { GlobalDataProvider } from "./Components/Contexts/SettingContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();
  return user != null ? element : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <GlobalDataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />
          </Routes>
          <ToastContainer
            position="top-center" // Set default position for all toasts
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          /> {/* Add ToastContainer here */}
        </Router>
      </GlobalDataProvider>
    </AuthProvider>
  );
}

export default App;
