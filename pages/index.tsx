import type {NextPage} from 'next'
import {useSession} from "next-auth/react";

const Home: NextPage = () => {
    const {data:session} = useSession();
  return (
    <div>
      <h1>Hello world!</h1>
        <div>{JSON.stringify(session)}</div>
    </div>
  )
}

export default Home
