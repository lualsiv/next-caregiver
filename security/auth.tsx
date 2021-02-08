// // contexts/auth.js
import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api';
import AccessDenied from '../pages/access-denied';
import Loader from "react-loader-spinner";

const REDIRECT_URL = '/'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      // dispatch({ type: 'updateUser', session });
      async function loadUser() {
          const { data: session } = await api.get('/api/auth/session')
          if (session.user) setSession(session);
          setLoading(false)
      }
      loadUser()
    },[]);    

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!session, session, isLoading: loading }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = ():any => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();  

  if(isLoading){    
    return <Loader type="Oval" color="#000000" height={100} width={100} timeout={3000} />
  }
  if (!isAuthenticated){
    return <AccessDenied />
  }
  return children;
};