const firstLoad = async () => {
  const tokenKey = localStorage.getItem("token");
  if (!tokenKey) {
    console.log("localStorage에 저장된 토큰이 없습니다.");
    window.location.href = "/signin";
  } else {
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
          console.log("Load성공");
          // window.location.href = "/mypage";
        } else {
          window.location.href = "/signin";
        }
      }
    } catch (err) {
      console.error(err);
      return;
    }
  }
};
const fetchInfo = async () => {
  const tokenKey = localStorage.getItem("token");

  const getInfo = await fetch("/api/user/getInfo", {
    method: "post",
    body: JSON.stringify({ tokenKey: tokenKey }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (getInfo.ok) {
    const userInfo = await getInfo.json();
    return userInfo;
  } else {
    return null;
  }
};
const myPageHome = document.getElementById("myPageHome");

const getMyInfo = async () => {
  const userInfo = await fetchInfo();
  if (!userInfo || userInfo.length === 0) {
    console.log("empty user Information");
    return;
  }
  console.log(userInfo);
  const itemElem = document.createElement("div");
  itemElem.innerHTML = `
      <div>
        <div><section id="nickNameSec">${userInfo.transToken.nickname}</section>
        <div>
        <input type="text" id="changingName"/> 
        <button id="changeName">닉네임 변경</button>
        <button id="cart">장바구니</button>
        <button id="main">메인화면</button>
        </div>
        </div>
        <div> ${userInfo.transToken.email} </div>
      </div>
      
    `;
  myPageHome.append(itemElem);
  const changingName = document.getElementById("changingName");
  const changeNameBtn = document.getElementById("changeName");

  changeNameBtn.addEventListener("click", async () => {
    const changingNameValue = changingName.value;
    if (changingNameValue.length < 2) {
      alert("잘못된 닉네임입니다.");
    } else {
      try {
        const tokenKey = localStorage.getItem("token");
        const changeNickName = await fetch("/api/user/changeName", {
          method: "post",
          body: JSON.stringify({
            tokenKey: tokenKey,
            changingNameValue: changingNameValue,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const checkChange = await changeNickName.json();
        if (checkChange.result) {
          console.log("change");
          alert("로그인을 다시 해주세요");
          window.location.href = "/signin";
          localStorage.removeItem("token");
        } else {
          console.log("no change");
        }
      } catch (err) {
        console.error(err);
      }
    }
  });
  const cartBtn = document.getElementById("cart");
  const mainBtn = document.getElementById("main");
  cartBtn.addEventListener("click", () => {
    window.location.href = "../cart";
  });

  mainBtn.addEventListener("click", () => {
    window.location.href = "../";
  });
};
firstLoad();
getMyInfo();
