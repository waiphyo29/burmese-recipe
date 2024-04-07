import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <>
    <Header />
    <ToastContainer 
      position="bottom-right" 
      autoClose={2000}
      pauseOnFocusLoss={false} 
    />
    <Outlet />
    </>
  )
}

export default Layout