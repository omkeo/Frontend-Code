import react from "react";
import "./App.css";
import Invoice from "./Components/Invoice/Invoice";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Components/Dashboard/Dashboard';
import { AuthProvider, useAuth } from './Components/Authentification/AuthContext';

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
        <ToastContainer
        position="bottom-left" // Set toast position
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
         /> {/* Add ToastContainer here */}
      </Router>
    </AuthProvider>
  );
}

export default App;
