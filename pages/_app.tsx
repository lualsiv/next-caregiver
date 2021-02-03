import '../styles/globals.scss'
import { AuthProvider, ProtectRoute } from '../contexts/auth'
import { Provider } from 'next-auth/client'
import Layout from './layouts/layout'
function MyApp({ Component, pageProps }) {
  const { session } = pageProps
  return(
    <>
      
      <Layout>
        {/* <AuthProvider> */}
        <Provider session={session}>
          {/* <ProtectRoute> */}
            <Component {...pageProps} />          
          {/* </ProtectRoute> */}
        </Provider>
        {/* </AuthProvider> */}
        
      </Layout>
    </>
  ) 
  
}

export default MyApp
