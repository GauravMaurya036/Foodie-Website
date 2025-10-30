var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#previous",
  },
});

// DOM ELEMENTS

const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const CloseBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cardTotal = document.querySelector('.cart-total');
const cartValue = document.querySelector('.cart-value');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.mobile-menu');
const bars= document.querySelector('.fa-bars');

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const famousLinks = document.querySelectorAll(".famous-link");

CloseBtn.addEventListener('click', () => cartTab.classList.remove('cart-tab-active'));
cartIcon.addEventListener('click', () => cartTab.classList.add('cart-tab-active'));
hamburger.addEventListener('click', () => navMenu.classList.toggle('mobile-menu-active'));
hamburger.addEventListener('click', () => bars.classList.toggle('fa-x'));


// CART STORAGE

let productList = [];
let cartProduct = [];

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cartProduct));
}

const loadCart = () => {
  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cartProduct = savedCart;
  cartList.innerHTML = "";
  cartProduct.forEach(product => addCartItemToDOM(product));
  updateTotal();
}


// TOTAL CALCULATION

const updateTotal = () => {
  let total = 0;
  let totalQuantity = 0;

  document.querySelectorAll('.item').forEach(item => {
    const quantity = parseInt(item.querySelector('.quantity-value').textContent);
    const price = parseFloat(item.querySelector('.item-total').textContent.replace('₹', ''));
    total += price;
    totalQuantity += quantity;
  });

  cardTotal.textContent = `Total: ₹${total.toFixed(2)}`;
  cartValue.textContent = totalQuantity;
}


// SHOW CARDS

const showCards = () => {
  productList.forEach(product => {
    const orderCard = document.createElement('div');
    orderCard.classList.add('order-card');
    orderCard.innerHTML = `
      <div class="card-image">
        <img src="${product.image}" alt="product image">
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">${product.price}</h4>
      <a href="#" class="btn card-btn">Add To Cart</a>
    `;
    cardList.appendChild(orderCard);

    const CardBtn = orderCard.querySelector('.card-btn');
    CardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};


// ADD TO CART

const addToCart = (product) => {
  const existingProduct = cartProduct.find(item => item.id === product.id);
  if (existingProduct) {
    alert('Product is already in the cart');
    return;
  }
  cartProduct.push(product);
  addCartItemToDOM(product);
  saveCart();
  updateTotal();
};

const addCartItemToDOM = (product) => {
  let quantity = 1;
  let price = parseFloat(product.price.replace('₹',''));

  const cartItem = document.createElement('div');
  cartItem.classList.add('item');
  cartItem.innerHTML = `
    <div class="item-image">
      <img src="${product.image}" alt="product image">
    </div>
    <div class="detail">
      <h4>${product.name}</h4>
      <h4 class="item-total">${product.price}</h4>
    </div>
    <div class="flex">
      <a href="#" class="quantity-btn minus">
        <i class="fa-solid fa-minus"></i>
      </a>
      <h4 class="quantity-value">${quantity}</h4>
      <a href="#" class="quantity-btn plus">
        <i class="fa-solid fa-plus"></i>
      </a>
    </div>
  `;
  cartList.appendChild(cartItem);

  const plusBtn = cartItem.querySelector('.plus');
  const quantityValue = cartItem.querySelector('.quantity-value');
  const itemTotal = cartItem.querySelector('.item-total');
  const minusBtn = cartItem.querySelector('.minus');

  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `₹${(price*quantity).toFixed(2)}`;
    updateTotal();
    saveCart();
  });

  minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(quantity > 1){
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `₹${(price*quantity).toFixed(2)}`;
      updateTotal();
      saveCart();
    } else {
      cartItem.classList.add('slide-out');
      setTimeout(() => {
        cartList.removeChild(cartItem);
        cartProduct = cartProduct.filter(item => item.id !== product.id);
        updateTotal();
        saveCart();
      }, 300);
    }
  });
}

const initApp = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian")
    .then(res => res.json())
    .then(data => {
      productList = data.meals.slice(0, 8).map((meal, index) => ({
        id: index + 1,
        name: meal.strMeal,
        price: `₹${120 + Math.floor(Math.random() * 300)}`,
        image: meal.strMealThumb
      }));
      showCards();
    })
    .catch(err => console.error("Error fetching Indian food API:", err));
};

initApp();
loadCart(); 

// SEARCH 

if (searchInput && searchBtn && famousLinks) {

  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchFoods(query);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) fetchFoods(query);
    }
  });

  famousLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = link.getAttribute("data-category");

      if (category === "All") {
        fetchAllFoods();
      } else {
        fetchFoods(category);
      }
    });
  });
}

function fetchFoods(query) {
  cardList.innerHTML = `<p>Loading...</p>`;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (!data.meals) {
        cardList.innerHTML = `<p>No results found for "${query}"</p>`;
        return;
      }

      productList = data.meals.map((meal, index) => ({
        id: index + 1,
        name: meal.strMeal,
        price: `₹${(120 + Math.floor(Math.random() * 300))}`,
        image: meal.strMealThumb
      }));

      cardList.innerHTML = "";
      showCards();
    })
    .catch(err => {
      console.error("Error fetching search results:", err);
      cardList.innerHTML = `<p>Error fetching data</p>`;
    });
}

function fetchAllFoods() {
  cardList.innerHTML = `<p>Loading...</p>`;

  const categories = [
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian",
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert",
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
  ];

  Promise.all(categories.map(url => fetch(url).then(res => res.json())))
    .then(results => {
      let combinedMeals = [];

      results.forEach(categoryData => {
        if (categoryData.meals) {
          combinedMeals = combinedMeals.concat(categoryData.meals.slice(0, 12)); 
        }
      });

      productList = combinedMeals.map((meal, index) => ({
        id: index + 1,
        name: meal.strMeal,
        price: `₹${(120 + Math.floor(Math.random() * 300))}`,
        image: meal.strMealThumb
      }));

      cardList.innerHTML = "";
      showCards();
    })
    .catch(err => {
      console.error("Error fetching all foods:", err);
      cardList.innerHTML = `<p>Error fetching data</p>`;
    });
}



// Tab Switching for Login/Signup
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
});

signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
});
