const data = [
    {
      id: 1,
      name: "OnePlus Nord 2T 5G",
      img: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/617MPEZB5mL._SL1500_.jpg",
      price: 28999,
      cat: "OnePlus",
    },
    {
      id: 11,
      name: "Xiaomi 11T Pro 5G Hyperphone",
      img: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41Bb3FyplZL._SX300_SY300_QL70_FMwebp_.jpg",
      price: 35999,
      cat: "Xiaomi",
    },
    {
      id: 2,
      name: "iPhone 14 Plus ",
      img: "https://m.media-amazon.com/images/I/716fAVud8PL._AC_SX960_.jpg",
      price: 119000,
      cat: "Apple",
    },
    {
      id: 3,
      name: "iPhone 14 Pro Max",
      img: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71yzJoE7WlL._SX679_.jpg",
      price: 139000,
      cat: "Apple",
    },
    {
      id: 4,
      name: "MI 11X Pro 5G",
      img: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41Y52jD863S._SX300_SY300_QL70_FMwebp_.jpg",
      price: 36999,
      cat: "Xiaomi",
    },
    {
      id: 5,
      name: "Samsung Galaxy M04  ",
      img: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/81t6Av5DvXL._SX679_.jpg",
      price: 9499,
      cat: "Samsung",
    },
  ];
  
  const productsContainer = document.querySelector(".products");
  const searchInput = document.querySelector(".search");
  const categoriesContainer = document.querySelector(".cats");
  const priceRange = document.querySelector(".priceRange");
  const priceValue = document.querySelector(".priceValue");
  
  const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = filteredProducts
      .map(
        (product) =>
          `
         <div class="product">
            <img
            src=${product.img}
            alt=""
            />
            <span class="name">${product.name}</span>
            <span class="priceText">Rs${product.price}</span>
          </div>
      `
      )
      .join("");
  };
  
  displayProducts(data);
  
  searchInput.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();
  
    if (value) {
      displayProducts(
        data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
      );
    } else {
      displayProducts(data);
    }
  });
  
  const setCategories = () => {
    const allCats = data.map((item) => item.cat);
    const categories = [
      "All",
      ...allCats.filter((item, i) => {
        return allCats.indexOf(item) === i;
      }),
    ];
  
    categoriesContainer.innerHTML = categories
      .map(
        (cat) =>
          `
        <span class="cat">${cat}</span>
      `
      )
      .join("");
  
    categoriesContainer.addEventListener("click", (e) => {
      const selectedCat = e.target.textContent;
  
      selectedCat === "All"
        ? displayProducts(data)
        : displayProducts(data.filter((item) => item.cat === selectedCat));
    });
  };
  
  const setPrices = () => {
    const priceList = data.map((item) => item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);
  
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = "Rs" + maxPrice;
  
    priceRange.addEventListener("input", (e) => {
      priceValue.textContent = "Rs" + e.target.value;
      displayProducts(data.filter((item) => item.price <= e.target.value));
    });
  };
  
  setCategories();
  setPrices();