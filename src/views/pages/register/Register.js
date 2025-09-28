import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormText,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilMobile } from '@coreui/icons'
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = import.meta.env.VITE_BASE_URL;


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    matchPassword: ""
  });

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }

    if (!formData.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.matchPassword?.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.matchPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return
    }
    try {
      const res = await axios.post(`${baseUrl}/api/auth/signup`, {
        full_name: formData.name,
        email: formData.email,
        phone: formData.mobile,
        password: formData.password,
        role: 'user',
        status: 'pending'
      })
      console.log('Success:', res.data)

    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      console.error('Status Code', err.response?.status);
      if (err.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Email Already Exists",
          text: "Please try with different Email..!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Somthing went wrong while Registering.",
          text: "Please try again."
        })
      }
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type='text'
                      placeholder="Full Name"
                      autoComplete="fullName"
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  {errors.name && <CFormText className="text-danger mb-2">{errors.name}</CFormText>}

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type='email'
                      placeholder="Email"
                      autoComplete="email"
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  {errors.email && <CFormText className="text-danger mb-2">{errors.email}</CFormText>}

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilMobile} />
                    </CInputGroupText>
                    <CFormInput
                      type='number'
                      placeholder="Mobile"
                      autoComplete="mobile"
                      name='mobile'
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  {errors.mobile && <CFormText className="text-danger mb-2">{errors.mobile}</CFormText>}

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  {errors.password && <CFormText className="text-danger mb-2">{errors.password}</CFormText>}

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm password"
                      autoComplete="confirm-password"
                      name='matchPassword'
                      value={formData.matchPassword}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  {errors.confirmPassword && (
                    <CFormText className="text-danger mb-2">{errors.confirmPassword}</CFormText>
                  )}
                  <div className="d-grid">
                    <CButton onClick={handleRegister} color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
