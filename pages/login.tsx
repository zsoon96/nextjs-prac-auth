export default function Login() {
  return (
    <form>
      <label>
        이메일 :
        <input type="email" name="email" placeholder="test@test.com"/>
      </label>

      <label>
        비밀번호 :
        <input type="password" name="password" />
      </label>
      <button type="submit">로그인</button>
    </form>
  )
}