//서버로부터 더미 데이터 호출
const fetchProductList = async () => {
  // product.controller와의 통신을 통해 `product` 가져옴
  const fetchResult = await fetch("/api/product", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (fetchResult.ok) {
    const fetchData = await fetchResult.json();
    // {result : true, data: []}
    console.log(fetchData);
    return fetchData.data;
  } else {
    return null;
  } //화면에 뿌려줄 재료 가공
};
const productListWrapper = document.getElementById("product_list_wrapper");

const renderProductList = async () => {
  // 화면에 뿌리기
  const productList = await fetchProductList();
  // productList [] | null
  if (!productList || productList.length === 0) {
    console.log("empty productList");
    return;
  }
  // productList가 존재할 때, 자바스크립트로 html로 그리기
  productList.forEach((v) => {
    const itemElem = document.createElement("div"); //dom이 아닌 메모리에만 저장되어 있음
    itemElem.innerHTML = `
      <div>${v.title}</div>
      <div>가격 : ${v.price}원</div>
      <div>상세 설명 : ${v.description}</div>
      <div>
        <img src = "${v.imgUrl}"/>
      </div>
      <div>재고수량 : ${v.stock}</div>
    `;
    productListWrapper.append(itemElem);
  });
};
renderProductList(); // 그리기 위해 함수를 써주기
