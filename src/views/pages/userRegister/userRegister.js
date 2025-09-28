import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CRow,
} from '@coreui/react'

const UserRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        role: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('User Registration Data:', formData)
        // 🔥 TODO: Call API here, e.g.
        // await api.post("/users/register", formData)
    }

    return (
        <CRow>
            <CCol xs={12} >
                <CCard className="mt-1 mb-4">
                    <CCardHeader>
                        <strong>User Registration</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div className="mb-3">
                                <CFormLabel htmlFor="fullName">Full Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Enter full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                                <CFormLabel htmlFor="email">Email</CFormLabel>
                                <CFormInput
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <CFormLabel htmlFor="password">Password</CFormLabel>
                                <CFormInput
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div className="mb-3">
                                <CFormLabel htmlFor="phone">Phone</CFormLabel>
                                <CFormInput
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Role */}
                            <div className="mb-3">
                                <CFormLabel htmlFor="role">Role</CFormLabel>
                                <CFormSelect
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select role</option>
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                    <option value="superadmin">Super Admin</option>
                                    <option value="employee">Employee</option>
                                    <option value="driver">Driver</option>
                                    <option value="manager">Manager</option>
                                    <option value="bus_owner">Bus Owner</option>
                                </CFormSelect>
                            </div>

                            {/* Submit */}
                            <div className="d-grid">
                                <CButton color="primary" type="submit">
                                    Register User
                                </CButton>
                            </div>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default UserRegister
