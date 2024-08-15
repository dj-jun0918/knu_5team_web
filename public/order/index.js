const product = JSON.parse(localStorage.getItem("cart")) || [];
const submit = document.getElementById("submit_payment");

// const products = product.map((item) => ({
//   productTitle: item.title,
//   productDescription: item.description,
//   productCount: item.orderCount,
//   productTotal: item.price * item.orderCount, // 예시로 총 금액 계산
// }));
// const fetchData = {
//   buyerName: `${buyer_name.value}`,
//   buyerPhone: `${buyer_phone.value}`,
//   buyerMail: `${buyer_mail.value}`,
//   receiverName: `${receiver_name.value}`,
//   receiverAddress: `${receiver_address.value}`,
//   receiverPhone: `${receiver_phone.value}`,
//   products,
// };

// console.log(fetchData);
submit.addEventListener("click", async () => {
  const products = product.map((item) => ({
    productTitle: item.title,
    productDescription: item.description,
    productCount: item.orderCount,
    productTotal: item.price * item.orderCount, // 예시로 총 금액 계산
  }));
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
  fetchOrder(fetchData);

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
});
//console.log(productsInfo);
// const fetchData = {
//   buyerName: `${buyer_name}`,
//   buyerPhone: `${buyer_phone}`,
//   buyerEmail: `${buyer_mail}`,
//   receiverName: `${receiver_name}`,
//   receiverAddress: `${receiver_address}`,
//   receiverPhone: `${receiver_phone}`,
//   productsInfo,
// };
// console.log(fetchData);
// const fetchOrder = async () => {
//   const fetchResult = await fetch("/api/order/save", {
//     method: "post",
//     body: JSON.stringify({ data: fetchData }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };
