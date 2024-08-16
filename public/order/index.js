const token = localStorage.getItem("token");
const product = JSON.parse(localStorage.getItem("cart")) || [];
const submit = document.getElementById("submit_payment");
const cart = localStorage.getItem("cart");
if (token) {
  const products = product.map((item) => ({
    productTitle: item.title,
    //productDescription: item.description,
    productCount: item.orderCount,
    productTotal: item.price * item.orderCount, // 예시로 총 금액 계산
  }));
  // 상품 정보를 표시할 위치를 지정합니다.
  const productListElement = document.getElementById("product-value");
  if (products.length !== 0) {
    // 각 상품을 반복하며 HTML에 표시합니다.
    products.forEach((item) => {
      // 상품 정보를 담을 div 요소를 생성합니다.
      const productElement = document.createElement("div");

      // 상품 제목, 설명, 수량, 가격, 총 가격을 포함한 내용을 추가합니다.
      productElement.innerHTML = `
      <h3>${item.productTitle}</h3>
      <p>Price: ${(item.productTotal / item.productCount).toLocaleString()}</p>
      <p>Quantity: ${item.productCount}</p>
      <p>Total: ${item.productTotal.toLocaleString()}</p>
    `;

      // 생성한 요소를 리스트에 추가합니다.
      productListElement.appendChild(productElement);
    });
  } else {
    productListElement.innerHTML = "<p>장바구니에 담은 상품이 없습니다</p>";
  }
  submit.addEventListener("click", async () => {
    if (cart) {
      const fetchData = {
        buyerName: `${buyer_name.value}`,
        buyerPhone: `${buyer_phone.value}`,
        buyerMail: `${buyer_mail.value}`,
        receiverName: `${receiver_name.value}`,
        receiverAddress: `${receiver_address.value}`,
        receiverPhone: `${receiver_phone.value}`,
        products,
      };
      console.log(fetchData);
      //fetchOrder(fetchData);

      const fetchResult = await fetch("/api/order/save", {
        method: "post",
        body: JSON.stringify({ data: fetchData }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(fetchResult);
      if (fetchResult.ok) {
        alert("결제 성공입니다.");
        return true;
      } else {
        alert("실패잉~");
        return null;
      }
    } else {
      alert("(!)현재 장바구니에 결제가 가능한 상품이 없습니다.");
    }
  });
} else {
  window.location.href = "../signin";
}
