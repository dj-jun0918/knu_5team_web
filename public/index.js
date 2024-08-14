//브라우저에서 사용하는 클라이언트 전용 자스

window.addEventListener("load", () => {
  console.log("로그인 페이지 로딩 완료");
});

const emailInput = document.getElementById("user_email");
const passwordInput = document.getElementById("user_password");
const loginButton = document.getElementById("login_button");

const joinButton = document.getElementById("signup_button");

loginButton.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  console.log(email, password);

  const fetchLogin = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      "Content-Type": "application/json",
    },
  }); //await 사용 시 async 사용

  if (fetchLogin.ok) {
    const loginResult = await fetchLogin.json();
    console.log(loginResult);
  }
});

joinButton.addEventListener("click", () => {
  window.location.href = "signup/index.html"; // 두 번째 HTML 파일의 경로
});
