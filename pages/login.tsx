import {useRouter} from "next/router";
import {useForm,} from "react-hook-form";
import {useAuth} from "../src/hooks/useAuth";


interface FormData {
    email: string
    password: string
}

const Login = () => {
    const router = useRouter();
    const auth = useAuth()

    type HookFormTypes = {
        email: string;
        password: string;
    }
    const {register, watch, handleSubmit, formState: {errors}} = useForm<HookFormTypes>();
    // console.log(watch())

    // const login = async (data: HookFormTypes) => {
    //     console.log(data)
    //     // Form 안에서 이메일, 패스워드 가져오기
    //     // [...nextauth]에서 설정한 provider 호출
    //     const response: any = await signIn("email-password-credential", {
    //         email: data.email,
    //         password: data.password,
    //         redirect: false,
    //         // 로그인 성공시 이동할 페이지 url 설정
    //         callbackUrl: 'http://localhost:3000'
    //     });
    //     // response가 반환해주는 데이터 중 url이 callbackUrl에 정의된 내용이 들어옴
    //     // 즉, response.url = 'http://localhost:3000/user'
    //     try {
    //         await router.push(response.url)
    //     } catch (err) {
    //         console.log(err)
    //         alert('아이디와 비밀번호를 확인해주세요.')
    //     }
    // }

    const login = (data:FormData) => {
        const { email , password } = data;
        // @ts-ignore
        auth.login({email, password})
    }

    return (
        <div>
            {/*onSubmit에 login 함수 등록*/}
            {/*로그인 버튼을 클릭하면 login 함수가 실행*/}
            <form onSubmit={handleSubmit(login)}>
                <label>
                    이메일 :
                    <input
                        type="email"
                        placeholder="test@test.com"
                        {...register('email', {
                            required: {
                                value: true,
                                message: '이메일은 필수값입니다.'
                            },
                            maxLength: {
                                value: 20,
                                message: '이메일은 최대 20자입니다.'
                            }
                        })}
                    />
                    <span style={{color: "red"}}>{errors.email?.type === "required" && errors.email.message}</span>
                    <span style={{color: "red"}}>{errors.email?.type === "maxLength" && errors.email.message}</span>
                </label>
                <label>
                    비밀번호 :
                    <input
                        type="password"
                        {...register('password', {
                            required: {
                                value: true,
                                message: '비밀번호는 필수값입니다.'
                            },
                            maxLength: {
                                value: 16,
                                message: '비밀번호는 최대 16자입니다.'
                            },
                            minLength: {
                                value: 2,
                                message: '비밀번호는 최소 2자입니다.'
                            }
                        })}
                    />
                    <span
                        style={{color: "red"}}>{errors.password?.type === "required" && errors.password.message}</span>
                    <span
                        style={{color: "red"}}>{errors.password?.type === "maxLength" && errors.password.message}</span>
                    <span
                        style={{color: "red"}}>{errors.password?.type === "minLength" && errors.password.message}</span>
                </label>

                <button type="submit">로그인</button>
            </form>
        </div>

    )
}

export default Login;
