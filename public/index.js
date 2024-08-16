window.addEventListener("load", () => {
  localStorage.removeItem("cart");
  const Button = document.getElementById("login_button");
  if (!localStorage.getItem("token")) {
  } else {
    Button.innerHTML = "로그아웃";
  }
  console.log("로그인 페이지 로딩 완료.");
});
// const emailInput = document.getElementById("user_email");
// const passwordInput = document.getElementById("user_password");
// const nicknameInput = document.getElementById("user_nickname");
const loginButton = document.getElementById("login_button");
const mypageButton = document.getElementById("mypage_button");
const productCheck = document.getElementById("product_button");

productCheck.addEventListener("click", () => {
  window.location.href = `./product`;
});
loginButton.addEventListener("click", async () => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    alert("로그아웃");
    window.location.reload();
  } else {
    window.location.href = "/signin";
  }
});

mypageButton.addEventListener("click", async () => {
  const tokenKey = localStorage.getItem("token");
  if (!tokenKey) {
    console.log("localStorage에 저장된 토큰이 없습니다.");
    window.location.href = "./signin";
    return;
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
      // result = {result : true}
      if (result.result) {
        window.location.href = "./mypage";
      } else {
        window.location.href = "./signin";
      }
    }
  } catch (err) {
    console.error(err);
    return;
  }
});
