import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './Context'

const ProtectedRoute=( {children }) =>{

const{IsAuthenticated}=useAuth()

   return IsAuthenticated ? children : <Navigate to='/login' />  
}
export default ProtectedRoute