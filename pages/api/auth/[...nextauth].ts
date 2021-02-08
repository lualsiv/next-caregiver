import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import FaunaAdapter from '../../../utils/nextauth/faunadb-adapter'
const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Email({
      server: {
        port: 587,
        host: process.env.SMTP_SERVER,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      from: process.env.EMAIL_FROM,
      
    })
  ],
  adapter: FaunaAdapter.Adapter(),
  callbacks: {
    redirect: async (url, _) => {
      if (url === '/api/auth/signin') {
        return Promise.resolve('/caregivers')
      }
      return Promise.resolve('/api/auth/signin')
    },
  },
}

export default (req, res) => NextAuth(req, res, options)