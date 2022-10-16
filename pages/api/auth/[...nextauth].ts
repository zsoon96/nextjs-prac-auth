import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import {NextApiRequest} from "next";

// 로그인 인증을 처리할 파일 생성

export default NextAuth({
    // 로그인 인증 방식 설정하기
    providers: [
        // 이메일과 패스워드 입력으로 인증
        Providers.Credentials({
            // 인증 방식 고유 id명
            id:"email-password-credential",
            // 해당 인증 방식 이름 설정
            name: 'Credentials',
            type: 'credentials',
            // nextAuth에서 자동으로 Form을 만들어주는데, 해당 Form에 들어갈 내용을 입력
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@test.com" },
                password: { label: "Password", type: "password" }
            },
            // Sign up 버튼을 누르면 들어오는 함수
            // 해당 부분에서 들어온 데이터를 가지고 인증을 진행
            // (지금은 무조건 인증되는 방식으로 처리)
            async authorize(credentials: Record<any, any>, req: NextApiRequest){

                const email = credentials.email;
                const password = credentials.password;

                // 로그인 성공 여부 임시코드
                if (email === 'test@test.com' && password === 'test'){
                    return credentials
                }
                throw new Error('아이디 혹은 비밀번호가 틀립니다.')
            }
        })
    ],
    // 커스텀 로그인 화면 맵핑
    pages: {
        signIn: '/login',
    }
})