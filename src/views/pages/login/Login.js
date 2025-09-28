import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Swal from 'sweetalert2'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import { getUser, setToken, setUser } from '../../../utils/auth'
const baseUrl = import.meta.env.VITE_BASE_URL;

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    //Validation
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Enter Email",
      });
      return
    }
    if (!password) {
      Swal.fire({
        icon: "error",
        title: "Enter Password",
      });
      return
    }
    Swal.fire({
      title: "Loading...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const res = await axios.post(`${baseUrl}/api/auth/login`, {
        email,
        password
      });

      const token = res.data.token;
      setToken(token);// Setting the Token
      const decode = jwtDecode(token);
      setUser(JSON.stringify(decode));
      const user = JSON.parse(getUser());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Welcome Mr. " + user.fullName,
        showConfirmButton: false,
        timer: 2000
      });
      // Swal.fire({
      //   icon: "success",
      //   title: "Welcome Mr. " + user.fullName,
      //   text: "Logged in!",
      // });

      navigate('/', { replace: true })
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...!  " + error.response?.data?.message || "Login failed",
        text: "Login failed.",
      });
    }
  }

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-body-secondary">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type='email'
                          value={email}
                          onChange={(e) => { setEmail(e.target.value) }}
                          placeholder="Email"
                          autoComplete="Email"
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          value={password}
                          onChange={(e) => { setPassword(e.target.value) }}
                          placeholder="Password"
                          autoComplete="current-password"
                          required
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={4}>
                          <CButton onClick={handleLogin} color="primary" className="px-4">
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={4}>
                          <CButton onClick={handleRegister} color="primary" className="px-4">
                            Register
                          </CButton>
                        </CCol>
                        <CCol xs={4} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
