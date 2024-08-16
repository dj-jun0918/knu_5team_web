// URLSearchParams 객체를 사용하여 쿼리 스트링 파라미터를 쉽게 가져올 수 있음
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
const productWrapper = document.getElementById("product_wrapper");
// productId를 사용하여 필요한 작업 수행
const token = localStorage.getItem("token");
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
  itemElem.classList.add("product-item");
  itemElem.innerHTML = `
  <div>
    <img src="${product.imgUrl}" alt="${product.title}"/>
  </div>
  <div class="product-info">
    <div>${product.title}</div>
    <div class="product-price">가격: ${product.price.toLocaleString()}원</div>
    <div>[상세설명] ${product.description}</div>
    <div>재고수량: ${product.stock}개</div>
    <input type="number" style="text-align:center" 
    name="inputValue" id="inputValue" value="1" min="1" max="${product.stock}" 
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
    if (!token) {
      window.location.href = "../../signin";
      return;
    }
    window.location.href = "../../order";
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
    window.location.href = "../../cart";
  } else {
    const existingProductIndex = prevCart.findIndex(
      (item) => item.productId === obj.productId
    );
    if (existingProductIndex > -1) {
      // new value => {productId:1, orderCount:5}
      // [{productId:1, orderCount:2}, {productId:2, orderCount:2}]
      // result => [{productId:1, orderCount:5}, {productId:2, orderCount:2}]
      // 현재 주문하려고 하는 수량 + 기존에 담겨있던 주문수량
      const orderCount =
        Number(obj.orderCount) +
        Number(prevCart[existingProductIndex].orderCount);
      const stock = Number(prevCart[existingProductIndex].stock);
      if (orderCount > stock) {
        alert(`(!)현재 ${prevCart.title} 상품은 수량 초과입니다`);
        return;
      }
      const resultCart = prevCart.map((cart) => ({
        ...cart,
        orderCount: orderCount,
        // prevCart[existingProductIndex].productId === obj.productId
        //   ? obj.orderCount
        //   : cart.orderCount,
      }));
      // const orderCount = Number(resultCart[existingProductIndex].orderCount);
      // const stock = Number(prevCart[existingProductIndex].stock);
      // if (orderCount > stock) {
      //   alert(`(!)현재 ${resultCart.title} 상품은 수량 초과입니다`);
      //   return;
      // } // 이따가 질문할 것
      console.log(typeof resultCart.orderCount);
      localStorage.setItem("cart", JSON.stringify(resultCart));
      if (token) {
        window.location.href = "../../cart";
      } else {
        window.location.href = "../../sign";
      }
    } else {
      pushCart.push(obj);
      localStorage.setItem("cart", JSON.stringify(pushCart));
      if (token) {
        window.location.href = "../../cart";
      } else {
        window.location.href = "../../sign";
      }
    }
  }
}; //로컬 스토리지 저장을 자동화 하게 해주는 함수

makeDiv();
