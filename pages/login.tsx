import { signIn } from "next-auth/client";
import {useRouter} from "next/router";

const Login = () => {
    const router = useRouter();

    const login = async (e: any) => {
        e.preventDefault();
        // Form 안에서 이메일, 패스워드 가져오기
        const email = e.target.email.value;
        const password = e.target.password.value;
        // [...nextauth]에서 설정한 provider 호출
        const response:any = await signIn("email-password-credential", {
            email,
            password,
            redirect: false,
            // 로그인 성공시 이동할 페이지 url 설정
            callbackUrl: 'http://localhost:3000/user'
        });
        // response가 반환해주는 데이터 중 url이 callbackUrl에 정의된 내용이 들어옴
        // 즉, response.url = 'http://localhost:3000/user'
        await router.push(response.url)
    }

    return (
        // onSubmit에 login 함수 등록
        // 로그인 버튼을 클릭하면 login 함수가 실행
        <form onSubmit={login}>
            <label>
                이메일 :
                <input type="email" name="email" placeholder="test@test.com" />
            </label>
            <label>
                비밀번호 :
                <input type="password" name="password" />
            </label>
            <button type="submit">로그인</button>
        </form>
    )
}

export default Login;
