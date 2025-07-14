const products = [];
for (let i = 1; i <= 30; i++) {
  products.push({
    id: i,
    name: `Sản phẩm ${i}`,
    price: 50000 + (i * 1000)
  });
}

const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let cart = [];

function displayProducts() {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const visible = products.slice(start, end);

  const list = document.getElementById('product-list');
  list.innerHTML = '';
  visible.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>Giá: ${p.price.toLocaleString()}₫</p>
        <button onclick="addToCart(${p.id})">Thêm vào giỏ</button>
      </div>
    `;
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const pagDiv = document.getElementById('pagination');
  pagDiv.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    pagDiv.innerHTML += `<button onclick="goToPage(${i})">${i}</button>`;
  }
}

function goToPage(page) {
  currentPage = page;
  displayProducts();
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-count').textContent = cart.length;
  const ul = document.getElementById('cart-items');
  ul.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    ul.innerHTML += `<li>${item.name} - ${item.price.toLocaleString()}₫ 
      <button onclick="removeFromCart(${index})">X</button></li>`;
  });

  document.getElementById('cart-total').textContent = total.toLocaleString();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function clearCart() {
  cart = [];
  updateCartUI();
}

function toggleCart() {
  const section = document.getElementById('cart-section');
  section.classList.toggle('hidden');
}

displayProducts();
