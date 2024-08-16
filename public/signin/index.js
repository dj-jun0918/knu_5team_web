const signinEmail = document.getElementById("signin_email");
const signinPassword = document.getElementById("signin_password");
const signinButton = document.getElementById("signin_button");

signinButton.addEventListener("click", async () => {
  const email = signinEmail.value;
  const password = signinPassword.value;
  try {
    const signinReslut = await fetch("/api/user/signin", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (signinReslut.ok) {
      const result = await signinReslut.json();
      //console.log("로그인 성공", result);
      //alert("로그인 성공!");
      localStorage.setItem("token", result.token);
      window.location.href = "../";
    } else {
      alert("로그인에 실패하였습니다!");
    }
  } catch (err) {
    console.error(err);
    alert("로그인 오류");
  }
});

const goSignUp = document.getElementById("signup_button");
goSignUp.addEventListener("click", async () => {
  window.location.href = "../signup";
});
