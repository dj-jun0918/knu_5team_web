// URLSearchParams 객체를 사용하여 쿼리 스트링 파라미터를 쉽게 가져올 수 있음
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
const productWrapper = document.getElementById("product_wrapper");
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
  const product = await fetchProduct();
  if (!product || product.length === 0) {
    console.log("empty productList");
    return;
  }
  const itemElem = document.createElement("div");
  itemElem.innerHTML = `
      <div>
        <img src="${product.imgUrl}"/>
      </div>
      <div>
      <div>${product.title}</div>
      <div>가격: ${product.price}원</div>
      <div>[상세설명] ${product.description}</div>
      <div>재고수량: ${product.stock}(개)</div>
      <input type="number" width=7px style="text-align:center" 
      name="inputValue" id="inputValue" min=1 max=${product.stock} 
      />
      <button id="shoppingBasket"> 장바구니 </button>
      <button id="purchaseButton"> 구매하기 </button>
      </div>
    `;
  productWrapper.append(itemElem);
  const shoppingBasket = document.getElementById("shoppingBasket");
  const purchaseButton = document.getElementById("purchaseButton");
  const addButton = document.getElementById("inputValue");
  //let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  purchaseButton.addEventListener("click", () => {
    if (addButton.value > 0) {
      // 새로운 객체 생성
      const obj = {
        productId: product.productId,
        title: product.title,
        imgUrl: product.imgUrl,
        price: product.price,
        stock: product.stock,
        orderCount: addButton.value, // 현재 입력한 수량
      };

      setProductItemToStorage(obj);
    }
  });

  shoppingBasket.addEventListener("click", () => {
    if (addButton.value > 0) {
      console.log(addButton.value);
      // 새로운 객체 생성
      const obj = {
        productId: product.productId,
        title: product.title,
        imgUrl: product.imgUrl,
        price: product.price,
        stock: product.stock,
        orderCount: addButton.value, // 현재 입력한 수량
      };
      setProductItemToStorage(obj);
    }
  });
};

const setProductItemToStorage = (obj) => {
  //로컬 스토리지를 추가하는 함수
  let prevCart = JSON.parse(localStorage.getItem("cart")) || [];
  let pushCart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!prevCart || !prevCart.length) {
    const renwalCart = [
      {
        productId: obj.productId,
        title: obj.title,
        imgUrl: obj.imgUrl,
        price: obj.price,
        stock: obj.stock,
        orderCount: obj.orderCount,
      },
    ];
    localStorage.setItem("cart", JSON.stringify(renwalCart)); //ok
    window.location.href = "../cart";
  } else {
    const existingProductIndex = prevCart.findIndex(
      (item) => item.productId === obj.productId
    );
    if (existingProductIndex > -1) {
      // new value => {productId:1, orderCount:5}
      // [{productId:1, orderCount:2}, {productId:2, orderCount:2}]
      // result => [{productId:1, orderCount:5}, {productId:2, orderCount:2}]
      const resultCart = prevCart.map((cart) => ({
        ...cart,
        orderCount:
          prevCart[existingProductIndex].productId === obj.productId
            ? obj.orderCount
            : cart.orderCount,
      }));
      // [{{productId:1, orderCount:2}]
      console.log(resultCart);
      localStorage.setItem("cart", JSON.stringify(resultCart));
      window.location.href = "../cart";
    } else {
      pushCart.push(obj);
      localStorage.setItem("cart", JSON.stringify(pushCart));
      window.location.href = "../cart";
    }
  }
}; //로컬 스토리지 저장을 자동화 하게 해주는 함수

makeDiv();
