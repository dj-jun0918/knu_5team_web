//1. (프론트)사용자가 마이페이지 버튼 혹은 직접 url을 입력해서 이동한다
//htttp://localhost:8000/mypage/

//2.(프론트+백앤드)사용자가 페이지 접근 후 localStorage에 있는 token을 꺼내서
//백엔드로 보내, 해당 토큰의 유효성을 검증한다.

//3. (백엔드) 유효성 검증 결과에 따른 사용자 인증 여부를
//프론트로 반환한다.
//res.json({isVerify:true}) 를 사용함

//4.(프론트) 3번으로 부터 받은 응답값을 통해서
//토큰이 유효하다면 그대로 페이지 사용을 하게함
//토큰이 유효하지 않다면 localHost/singin 페이지로 보냄
window.addEventListener("load", async () => {
  const tokenKey = localStorage.getItem("token");
  if (!tokenKey) {
    console.log("localStorage에 저장된 토큰이 없습니다.");
    window.location.href = "/signin";
  }
  try {
    const tokenIsValid = await fetch("/api/user/token", {
      method: "post",
      body: JSON.stringify({ token: tokenKey }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (tokenIsValid.ok) {
      const result = await tokenIsValid.json();
      console.log("result", result);
      // result = {result : true}
      if (result.result) {
        console.log("T성공");
        // window.location.href = "/mypage";
      } else {
        window.location.href = "/signin";
      }
    }
  } catch (err) {
    console.error(err);
    return;
  }
});
