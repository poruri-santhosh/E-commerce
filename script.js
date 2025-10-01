const productsEl = document.getElementById("products");
const cartBtn = document.getElementById("cart-btn");
const cartSection = document.getElementById("cart");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
  { id: 1, name: "T-Shirt", price: 20, img: "https://via.placeholder.com/150" },
  { id: 2, name: "Jeans", price: 40, img: "https://via.placeholder.com/150" },
  { id: 3, name: "Sneakers", price: 60, img: "https://via.placeholder.com/150" },
  { id: 4, name: "Cap", price: 15, img: "https://via.placeholder.com/150" }
];

function renderProducts() {
  productsEl.innerHTML = products.map(p => `
    <div class="product">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p>Cart is empty.</p>";
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <li>${item.name} - $${item.price} x ${item.qty}
      <button onclick="removeFromCart(${item.id})">❌</button>
      </li>
    `).join("");
  }

  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  cartTotalEl.textContent = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  let product = products.find(p => p.id === id);
  let item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

cartBtn.addEventListener("click", () => {
  cartSection.classList.toggle("hidden");
});

clearCartBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});

renderProducts();
renderCart();
