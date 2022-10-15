import {signIn, signOut, useSession} from "next-auth/react";

// 로그인 화면

export default function Login() {
  // @ts-ignore
  const [session, loading] = useSession();

  if (session) {
    return (
        <>
          Signed in as {session.user.email} <br/>
          <button onClick={() => signOut()}>로그아웃</button>
        </>
    )
  }
  return (
      <>
        Not Signed in <br/>
        <button onClick={() => signIn()}>로그인</button>
      </>
  )
}