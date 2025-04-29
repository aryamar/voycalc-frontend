import React, { useState, createContext, useContext } from 'react'


const Mycontext = createContext()

export default function Context({ children }) {

    const [IsAuthenticated, setIsAuthenticated] = useState(false)
   

    const login = () => {
        setIsAuthenticated(true)
    }

    const logout = () => {
        setIsAuthenticated(false)
       
    }
   
    return (
        <>
            <Mycontext.Provider value={{IsAuthenticated,login,logout}} >
                {children} 
            </Mycontext.Provider>
        </>
    )
}
export const useAuth=()=>useContext(Mycontext)