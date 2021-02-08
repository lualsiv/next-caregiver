import '../styles/globals.scss'
import {AuthProvider, ProtectRoute} from '../security/auth'
import { Provider } from 'next-auth/client'
import Layout from './layouts/layout'
import React from 'react';


function MyApp ({ Component, pageProps }) {
  const { session } = pageProps
  return(
    <>      
      <Layout>        
        <Provider session={session}>
          <AuthProvider>
            <ProtectRoute >
              <Component {...pageProps} />          
            </ProtectRoute>
          </AuthProvider>
        </Provider>                
      </Layout>
    </>
  ) 
  
}

export default MyApp
