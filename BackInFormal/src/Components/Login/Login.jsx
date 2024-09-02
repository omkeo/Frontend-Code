import React, { useState } from 'react'
import './login.css'
import { Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuth } from '../Authentification/AuthContext';
import { useNavigate } from 'react-router-dom';


function Login() {

  const { login }=useAuth();
  const navigate = useNavigate();

const [username,setUsername]=useState('')
const [password,setPassword]=useState('')

const handleLogin=async(e)=>{
  e.preventDefault();
  const formdata=new FormData();
  formdata.append('username',username);
  formdata.append('password',password);
  try {
    const response= await axios.post('http://localhost:8080/users/login',formdata)
    if (response.status==200) {
      toast.success('Log in success...');
      login(response.data)
      navigate('/dashboard')
      
      
      
    }
    
  } catch (error) {
    toast.error('Invalid username or password...');
    
  }
 
}


  return (
    <div className='loginPageHOme'>
      <Row className='loginPageHOme'>
        <Col xs={8} className='imgFieldInLOgin'></Col>
        <Col xs={4} className='formFieldInLogin'>
          <Row className='loginFormInLOginPage'>
            <Col xs={12}><h2 style={{ color: '#db634a', textAlign: 'center' }}>Login</h2></Col>
            <Col xs={12}>
              <form onSubmit={(e)=>handleLogin(e)}>
                <label for="exampleInputEmail1">User Name</label><br />
                <div className="formGRoup">
                  <input type="text" name="" id="" onChange={(e)=>setUsername(e.target.value)}/>
                </div>

                <label for="exampleInputEmail1">Password</label><br />
                <div className="formGRoup">
                  <input type="password" name="" id="" onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <Button type='submit' className='LoginBtnInLoginPage'>Login</Button>
                <p className='ForgotPasSpan'>Forgot Password</p>
              </form>
            </Col>
          </Row>

        </Col>
      </Row>
    </div>
  )
}

export default Login
