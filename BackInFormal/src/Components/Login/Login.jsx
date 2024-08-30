import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuth } from '../Authentification/AuthContext';

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Destructure login from context
  const navigate = useNavigate(); // Get the navigate function

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('username', username);
    formdata.append('password', password);
    
    try {
      const response = await axios.post('http://localhost:8080/users/login', formdata);
      if (response.status === 200) {
        login(response.data); // Use login from context
        toast.success('Login successful!');
        setTimeout(
          () => navigate('/dashboard'), // Navigate to home after 2 seconds
          1000
        )
         
        return;
      }
    } catch (error) {   
      toast.error(`${error.response.data}`);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '350px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" id="username" className="form-control" required
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              className="form-control"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-link position-absolute top-50 end-0 translate-middle-y"
              onClick={handlePasswordToggle}
              style={{ right: '15px', marginTop: '15px' }}
            >
              <i className={passwordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
            </button>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
