import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import {NextApiRequest} from "next";
import { signIn } from "next-auth/client";

// 로그인 인증을 처리할 파일 생성

export default NextAuth({
    // 로그인 인증 방식 설정하기
    providers: [
        // 이메일과 패스워드 입력으로 인증하겠다.
        Providers.Credentials({
            // 해당 인증 방식 이름 설정
            name: "email-password-credential",
            // nextAuth에서 자동으로 Form을 만들어주는데, 해당 Form에 들어갈 내용을 입력
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@test.com" },
                password: { label: "Password", type: "password" }
            },
            // Sign up 버튼을 누르면 들어오는 함수
            // 해당 부분에서 들어온 데이터를 가지고 인증을 진행
            // (지금은 무조건 인증되는 방식으로 처리)
            async authorize(credentials: Record<any, any>, req: NextApiRequest){
                return credentials;
            }
        })
    ],
    // 커스텀 로그인 화면 맵핑
    pages: {
        signIn: '/login',
    }
})