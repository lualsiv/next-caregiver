// contexts/auth.js
import React, { createContext, useState, useContext, useEffect } from 'react'
import useSWR from 'swr';
import Router, {useRouter} from 'next/router'
import { getAuthCookie, removeAuthCookie } from '../utils/auth-cookies';

//api here is an axios instance which has the baseURL set according to the env.
import api from '../services/api';


const AuthContext:any = createContext({});

export const AuthProvider = ({children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const fetcher = (url) => fetch(url).then((r) => r.json());

    useEffect(() => {
        async function loadUserFromCookies() {
             const { token } = children.props.children.props;
            // console.info('loadUserFromCookies-token',token)
            if (token) {
                console.log("Got a token in the cookies, let's see if it is valid")
                api.defaults.headers.Authorization = `Bearer ${token}`
                const { data: user } = await api.get('/api/auth/user')
                if (user) setUser(user);
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])
    
    const login = async (email, password) => {
        
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          })

        if (res.ok) {
            console.log("Got token")
                
            api.defaults.headers.Authorization = `Bearer ${res.body}`
            const { data: user } = await api.get('/api/auth/user')
            setUser(user)
            console.log("Got user", user)

        }
    }

    const logout = async () => {
        
        const res = await fetch('/api/auth/logout');
        if (res.ok) {
            setUser(null)
            delete api.defaults.headers.Authorization
            Router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, isLoading: loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth:any = () => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
    var aux = useAuth();
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();


    // console.info('aux',aux)
    // console.info('isloading',isLoading)
    // console.info('isAuthenticated',isAuthenticated)
    if (isLoading || (!isAuthenticated && router.asPath !== '/login')){
      return <div>Loading</div>; 
    }
    return children;
  };