import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PasswordReset from './pages/PasswordReset'
import PasswordResetOtp from './pages/PasswordResetOtp'
import NewPasswordSet from './pages/NewPasswordSet'
import DashbordLayout from './layouts/DashbordLayout'
import DashBoardIndexPage from './pages/Dashboard/IndexPage'
import ProfilePage from './pages/Dashboard/ProfilePage'
import CustomerPage from './pages/Dashboard/CustomerPage'
import LogoutPage from './pages/LogoutPage'
import CategoryPage from './pages/Dashboard/CategoryPage'
import InvoicePage from './pages/Dashboard/InvoicePage'
import ProductPage from './pages/Dashboard/ProductPage'
import SalePage from './pages/Dashboard/SalePage'
import ReportPage from './pages/Dashboard/ReportPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-reset-otp" element={<PasswordResetOtp />} />
        <Route path="/new-password-set" element={<NewPasswordSet />} />
        <Route path="/logout" element={<LogoutPage />} />


        <Route path="/dashboard" element={<DashbordLayout />}>
          <Route path="index" element={<DashBoardIndexPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='customer' element={<CustomerPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path='invoice' element={<InvoicePage />} />
          <Route path='products' element={<ProductPage />} />
          <Route path='creact_sales' element={<SalePage />} />
          <Route path='report' element={<ReportPage />}/>
        </Route>
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App