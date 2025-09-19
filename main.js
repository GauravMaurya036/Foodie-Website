// Make sure Swiper is loaded before this script runs, e.g. by including Swiper's JS via <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script> in your HTML
var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#previous",
  },
});

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

CloseBtn.addEventListener('click', () => cartTab.classList.remove('cart-tab-active'));
cartIcon.addEventListener('click', () => cartTab.classList.add('cart-tab-active'));
hamburger.addEventListener('click', () =>navMenu.classList.toggle('mobile-menu-active'));
hamburger.addEventListener('click', () => bars.classList.toggle('fa-x'));

let productList = [];
let cartProduct = [];

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


const addToCart = (product) => {

  const existingProduct = cartProduct.find(item => item.id === product.id);
  if (existingProduct) {
    alert('Product is already in the cart');
    return;
  }
  cartProduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace('₹', ''));

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
  updateTotal();
  const plusBtn = cartItem.querySelector('.plus');
  const quantityValue = cartItem.querySelector('.quantity-value');
  const itemTotal = cartItem.querySelector('.item-total');
  const minusBtn = cartItem.querySelector('.minus');

  minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (quantity >1){
    quantity--;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `₹${(price * quantity).toFixed(2)}`;
    updateTotal();
    } else {
      cartItem.classList.add('slide-out');
      setTimeout(() => {
        cartList.removeChild(cartItem);
        cartProduct = cartProduct.filter(item => item.id !== product.id);
        updateTotal();
      }, 300);       
    }


  });




  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `₹${(price * quantity).toFixed(2)}`;
    updateTotal();
  });
}
// const initApp = () => {
//   fetch('product.json')
//     .then(res => res.json())
//     .then(data => {
//       productList = data;
//       showCards();
//     })

// }

const initApp = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian")
    .then(res => res.json())
    .then(data => {
      productList = data.meals.slice(0, 8).map((meal, index) => ({
        id: index + 1,
        name: meal.strMeal,
        price: `₹${(120 + Math.floor(Math.random() * 300))}`, 
        image: meal.strMealThumb
      }));
      showCards();
    })
    .catch(err => console.error("Error fetching Indian food API:", err));
};

initApp();