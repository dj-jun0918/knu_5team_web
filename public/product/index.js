const loginButton = document.getElementById("login_button");
const mypageButton = document.getElementById("mypage_button");

const fetchProductList = async () => {
  //1.product.controller와의 통신을 통해 `product`데이터를 가져옴
  const fetchResult = await fetch("/api/product", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (fetchResult.ok) {
    const fetchData = await fetchResult.json();
    //{result: true, data:[]}
    console.log(fetchData);
    return fetchData.data;
  } else {
    return null;
  }
};
const productListWrapper = document.getElementById("product_list_wrapper");
const renderProductList = async () => {
  const productList = await fetchProductList();
  //productList [] | null
  if (!productList || productList.lengh === 0) {
    console.log("empty productList");
    return;
  }
  //productList가 존재하는 경우
  productList.forEach((v) => {
    const itemElem = document.createElement("div");
    itemElem.id = `product-${v.productId}`;
    itemElem.style.width = 300;
    itemElem.style.margin = 20;
    itemElem.innerHTML = `
      <div>
        <img src="${v.imgUrl}"/>
      </div>
      <div>
      <div>${v.title}</div>
      <div>가격: ${v.price}원</div>
      <div>[상세설명] ${v.description}</div>
      <div>재고수량: ${v.stock}(개)</div>
      </div>
    `;
    productListWrapper.append(itemElem);
    itemElem.addEventListener("click", () => {
      // 예를 들어, productId를 사용하여 제품 상세 페이지로 이동
      window.location.href = `./detail?productId=${v.productId}`;
    });
  });
};
renderProductList();
loginButton.addEventListener("click", async () => {
  window.location.href = "../signin";
});

mypageButton.addEventListener("click", async () => {
  window.location.href = "../mypage";
});

function main() {
  window.location.href = "../";
}
