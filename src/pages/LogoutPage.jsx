import React from 'react'
import { useNavigate, Navigate } from 'react-router'
const LogoutPage = () => {
    localStorage.removeItem("token");
    //  const navigate = useNavigate()
    //  navigate("/login")
    return <Navigate to="/" />
}

export default LogoutPage