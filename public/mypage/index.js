// 1. (프론트) 사용자가 [마이페이지] 버튼 혹은 직접 url을 입력해서 이동
// 2. (프론트 + 백엔드) 사용자가 페이지 접근 후, Local Storage에 있는 token을 꺼내서, 백엔드로 보내서 해당 토큰의 유효성을 확인
// 3. (백엔드) 유효성 검증 결과에 따른 사용자 인증 여부를 프론트로 반환한다. res.json({isVerify : true})
// 4. (프론트) 3번으로부터 받은 응답값을 통해서, 토큰이 유효하다면 그대로 페이지 사용을 하게 하고, 토큰이 유효하지 않다면 localhost:8000/signin

const tokenKey = localStorage.getItem("token");
const tokenIsValid = await fetch("/api/user/token", {
  method: "post",
  body: JSON.stringify({ tokenKey }),
  headers: {
    "Content-Type": "application/json",
  },
});

if (tokenKey) {
  window.location.href = "./mypage";
} else {
  window.location.href = "./signin";
}
