import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import FaunaAdapter from '../../../utils/nextauth/faunadb-adapter'
const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Email({
      server: {
        port: 465,
        host: 'smtp.gmail.com',
        secure: true,
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
}

export default (req, res) => NextAuth(req, res, options)