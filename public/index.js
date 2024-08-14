<<<<<<< HEAD
//브라우저에서 사용하는 클라이언트 전용 자스

window.addEventListener("load", () => {
  console.log("로그인 페이지 로딩 완료");
=======
window.addEventListener("load", () => {
  console.log("로그인 페이지 로딩 완료.");
>>>>>>> fce3c7f35b5362d4fe8c543cc971f571ae9b9c80
});

const emailInput = document.getElementById("user_email");
const passwordInput = document.getElementById("user_password");
const loginButton = document.getElementById("login_button");

loginButton.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const nickname = nicknameInput.value;
  console.log(email, password, nickname);

  const fetchLogin = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify({
      email: email,
      password: password,
      nickname: nickname,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (fetchLogin.ok) {
    const loginResult = await fetchLogin.json();
    console.log(loginResult);
  }
});
