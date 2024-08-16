const loginButton = document.getElementById("login_button");
const mypageButton = document.getElementById("mypage_button");
let cartStorage = JSON.parse(localStorage.getItem("cart")) || []; // cartStorage로 변수 이름 수정
const token = localStorage.getItem("token");

if (token) {
  loginButton.addEventListener("click", async () => {
    loginButton.innerHTML = "로그아웃";
    window.location.href = "../";
  });

  mypageButton.addEventListener("click", async () => {
    window.location.href = "../mypage";
  });

  const cartContainer = document.getElementById("cart-container");
  //const priceSum = 0;
  // 장바구니가 비어 있지 않은 경우
  if (cartStorage.length > 0) {
    cartStorage.forEach((item) => {
      // cartStorage를 사용
      // 상품 정보를 담을 div 요소 생성
      const productDiv = document.createElement("div");
      // priceSum += item.price;
      // 상품 정보를 HTML로 구성
      productDiv.innerHTML = `
            <div>
              <h2>${item.title}</h2> <!-- 상품 제목 -->
              <img src="${item.imgUrl}" alt="${
        item.title
      }" style="width: 100px;"> <!-- 상품 이미지 -->
              <p>가격: ${item.price.toLocaleString()}원</p> <!-- 상품 가격 -->
              <p>수량: ${item.orderCount}개</p> <!-- 구매 수량 -->
              <button id = "delete_product" onclick="removeFromCart(${
                item.id
              })">상품 삭제</button>
            <div>
          `;

      // 생성한 상품 정보를 cartContainer에 추가
      cartContainer.appendChild(productDiv);
    });
  } else {
    // 장바구니가 비어 있을 경우 메시지 표시
    cartContainer.innerHTML = "<p>장바구니가 비어 있습니다.</p>";
  }

  const productSum = () => {
    const productQuan = cartStorage.map((product) => {
      return product.orderCount;
    });
    console.log(productQuan);
    const productPrice = cartStorage.map((product) => {
      return product.price;
    });
    console.log(productPrice);
    const totalSum = cartStorage.reduce((currentSum, product) => {
      return currentSum + product.price * product.orderCount;
    }, 0);
    document.getElementById(
      "productSum"
    ).innerText = `총 가격: ${totalSum.toLocaleString()}원`;
  };

  function removeFromCart(index) {
    // 로컬 스토리지에서 장바구니 정보를 가져옴
    let cartList = JSON.parse(localStorage.getItem("cart")) || [];

    // 해당 인덱스의 상품을 제거
    cartList.splice(index, 1);

    // 변경된 장바구니 정보를 로컬 스토리지에 다시 저장
    localStorage.setItem("cart", JSON.stringify(cartList));

    // 페이지 새로고침하여 변경 사항 반영
    location.reload();
  }
  //delete_product.addEventListener("click", () => {});
  document.addEventListener("DOMContentLoaded", productSum);

  const orderProduct = document.getElementById("order-button");

  orderProduct.addEventListener("click", async () => {
    const cart = localStorage.getItem("cart");
    console.log(cart.length);
    if (cart.length > -1) {
      window.location.href = "../product";
      return;
    }
    window.location.href = "../order";
  });
  function main() {
    window.location.href = "../";
  }
} else {
  window.location.href = "../product";
}
