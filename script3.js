
const products = [
    { 
        id: 1, 
        name: "Laptop", 
        category: "electronics", 
        price: 800, 
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 2, 
        name: "Headphones", 
        category: "electronics", 
        price: 100, 
        img: "https://images.unsplash.com/photo-1518444028785-8f86c7a4e2b5?auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 3, 
        name: "T-Shirt", 
        category: "fashion", 
        price: 25, 
        img: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 4, 
        name: "Sneakers", 
        category: "fashion", 
        price: 60, 
        img: "https://images.unsplash.com/photo-1528701800489-20be3c3fefc5?auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 5, 
        name: "Pizza", 
        category: "food", 
        price: 10, 
        img: "https://images.unsplash.com/photo-1548365328-5b8493f2b7f9?auto=format&fit=crop&w=400&q=80" 
    }
];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(filter = "all", search = "") {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    const filtered = products.filter(p => 
        (filter === "all" || p.category === filter) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    filtered.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
           <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300'">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
            <button onclick="viewProduct(${p.id})">View</button>
        `;

        list.appendChild(div);
    });
}

function addToCart(id) {
    cart.push(id);
    saveCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
}

function clearCart() {
    cart = [];
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    renderCart();
    calculateTotal();
}

function updateCart() {
    document.getElementById("cartCount").innerText = cart.length;
}

function calculateTotal() {
    let total = 0;

    cart.forEach(id => {
        const product = products.find(p => p.id === id);
        total += product.price;
    });

    document.getElementById("totalPrice").innerText = total;
}
function goToCheckout() {
    window.location.href = "checkout.html";
}

function viewProduct(id) {
    localStorage.setItem("selectedProduct", id);
    window.location.href = "product.html";
}

function renderCart() {
    const cartDiv = document.getElementById("cartItems");
    cartDiv.innerHTML = "";

    cart.forEach((id, index) => {
        const product = products.find(p => p.id === id);

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <span>${product.name} - $${product.price}</span>
            <button onclick="removeFromCart(${index})">❌</button>
        `;

        cartDiv.appendChild(div);
    });
}

document.getElementById("search").addEventListener("input", e => {
    renderProducts(document.getElementById("category").value, e.target.value);
});

document.getElementById("category").addEventListener("change", e => {
    renderProducts(e.target.value, document.getElementById("search").value);
});

// Init
updateCart();
renderCart();
renderProducts();