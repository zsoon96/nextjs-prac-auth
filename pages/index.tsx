import {useRouter} from "next/router";
import {useContext} from "react";
import AuthContext from "../src/context/AuthContext";

const Home = () => {
    const ctx = useContext(AuthContext);
    console.log(ctx.user)
    const router = useRouter();

    if (ctx.isAuth) {
        console.log(ctx.isAuth)
        return (
            <>
                로그인 되었습니다.  <br/>
                <button >Sign out</button>
            </>
        )
    }
    return (
        <>
            로그인이 필요합니다. <br/>
            <button onClick={() => router.push('/login') }>Sign in</button>
        </>
    )
}

export default Home;
