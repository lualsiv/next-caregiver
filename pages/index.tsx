import styles from '../styles/Home.module.scss'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession();

  console.info('Home', loading)
  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
    <h1>Welcome the Caregivers App!</h1>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </>
  )  
}
