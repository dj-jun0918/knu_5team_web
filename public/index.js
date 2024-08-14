window.addEventListener("load", () => {
  console.log("로그인 페이지 로딩 완료.");
});

const emailInput = document.getElementById("user_email");
const passwordInput = document.getElementById("user_password");
const loginButton = document.getElementById("login_button");
const joinButton = document.getElementById("join_button");

const mypageButton = document.getElementById("mypage_button");

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

mypageButton.addEventListener("click", () => {
  window.location.href = "/mypage/index.html"; // mypage로 이동
});

joinButton.addEventListener("click", () => {
  window.location.href = "/signup/index.html"; // mypage로 이동
});
