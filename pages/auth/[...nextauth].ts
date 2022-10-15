import { NextApiRequest } from "next";
import NextAuth from "next-auth";
import Providers from 'next-auth/providers'

// 로그인 인증을 처리하는 역할

export default NextAuth({
    providers: [
        Providers.Credentials({
           name: "email-password-credentials",
           credentials: {
               email: {label:"Email", type: 'email', placeholder: 'test@example.com'},
               password: {label:"Password", type: 'password'}
           },
            async authorize(credentials: Record<any, any>, req:NextApiRequest) {
               return credentials;
            }
        })
    ]
})