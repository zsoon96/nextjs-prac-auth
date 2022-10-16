import { signIn } from "next-auth/client";

const Login = () => {
    const login = async (e: any) => {
        e.preventDefault();
        // Form 안에서 이메일, 패스워드 가져오기
        const email = e.target.email.value;
        const password = e.target.password.value;
        // [...nextauth]에서 설정한 provider 호출
        const response = await signIn("email-password-credential", {
            email,
            password,
            redirect: false
        });
        console.log(response);
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
