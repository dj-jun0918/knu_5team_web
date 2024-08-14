// URLSearchParams 객체를 사용하여 쿼리 스트링 파라미터를 쉽게 가져올 수 있음
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
const productListWrapper = document.getElementById("product_list_wrapper");
// productId를 사용하여 필요한 작업 수행

const fetchProduct = async () => {
  const productResult = await fetch("/api/product/oneProduct", {
    method: "post",
    body: JSON.stringify({ productId: productId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (productResult.ok) {
    const productData = await productResult.json();
    if (!productData.result) {
      window.location.href = "/product";
    }
    //{result: true, data:[]}
    console.log(productData.data);
    return productData.data;
  } else {
    return null;
  }
};
const makeDiv = async () => {
  const productList = await fetchProduct();
  if (!productList || productList.lengh === 0) {
    console.log("empty productList");
    return;
  }
  const itemElem = document.createElement("div");
  itemElem.innerHTML = `
      <div>
        <img src="${productList.imgUrl}"/>
      </div>
      <div>
      <div>${productList.title}</div>
      <div>가격: ${productList.price}원</div>
      <div>[상세설명] ${productList.description}</div>
      <div>재고수량: ${productList.stock}(개)</div>
      </div>
    `;
  productListWrapper.append(itemElem);
};
makeDiv();
