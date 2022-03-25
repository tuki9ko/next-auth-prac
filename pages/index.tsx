import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

const Page = () => {
  const { data: session, data: loading } = useSession()

  return (
    <>
      {!session && (
        <>
          {loading ? (
            <>Loading ...</>
          ) : (
            <>
              Not signed in <br/>
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </>
      )}
      {session && (
        <>
          Signed in as <br />
          <img src={session.user?.image ?? ""} width="50px" />
          {session.user?.name} <br />
          AccessToken : {session.accessToken} <br />
          <a href="/tweet">fox cute!</a><br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  )
}

export default Page;