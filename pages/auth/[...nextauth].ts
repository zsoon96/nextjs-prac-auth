import {NextApiRequest} from "next";
import NextAuth from "next-auth";
import Providers from 'next-auth/providers'

// 로그인 인증을 처리하는 역할

export default NextAuth({
    providers: [
        // 로그인 인증 방식 설정
        Providers.Credentials({
            // 해당 인증 방식의 이름
            name: "email-password-credentials",
            // Next Auth에서 자동으로 Form을 만들어주는데, 해당 Form에 들어갈 내용 입력
            credentials: {
                email: {label: "Email", type: 'email', placeholder: 'test@example.com'},
                password: {label: "Password", type: 'password'}
            },
            // Sign In 버튼을 누르면 들어오는 함수
            // 해당 부분에서 들어온 데이터를 가지고 인증 진행
            async authorize(credentials: Record<any, any>, req: NextApiRequest) {
                return credentials;
            }
        })
    ]
})