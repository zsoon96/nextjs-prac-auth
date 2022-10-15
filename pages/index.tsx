// @ts-ignore
import {signIn, signOut, useSession} from "next-auth/client";

// 로그인 화면

export default function Login() {
    // @ts-ignore
    const [session, loading] = useSession();

    // 세션값 여부를 통해 로그인 확인

    // 세션이 있으면, 사용자 정보 & 로그아웃 버튼 보여주기
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br/>
                <button onClick={() => signOut()}>로그아웃</button>
            </>
        )
    }
    // 세션이 없으면, 안내 문구 & 로그인 버튼 보여주기
    return (
        <>
            Not Signed in <br/>
            <button onClick={() => signIn()}>로그인</button>
        </>
    )
}