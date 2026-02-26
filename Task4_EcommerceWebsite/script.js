// Task 4 - E-Commerce Script
// Handles: product display, search, category filters, and the shopping cart

// List of all products
var products = [
    { id: 1, name: "Wireless ANC Headphones", cat: "tech", price: 189, oldPrice: 249, icon: "🎧", badge: "sale", rating: "★★★★★ (412)" },
    { id: 2, name: "Smart Watch Series X", cat: "tech", price: 299, oldPrice: null, icon: "⌚", badge: "new", rating: "★★★★★ (287)" },
    { id: 3, name: "Portable SSD 1TB", cat: "tech", price: 99, oldPrice: 129, icon: "💾", badge: "sale", rating: "★★★★☆ (184)" },
    { id: 4, name: "Premium Leather Jacket", cat: "fashion", price: 249, oldPrice: null, icon: "🧥", badge: "new", rating: "★★★★★ (93)" },
    { id: 5, name: "Minimalist Sneakers", cat: "fashion", price: 120, oldPrice: 159, icon: "👟", badge: "sale", rating: "★★★★★ (530)" },
    { id: 6, name: "Silk Dress Shirt", cat: "fashion", price: 89, oldPrice: null, icon: "👔", badge: null, rating: "★★★★☆ (201)" },
    { id: 7, name: "Scented Candle Set", cat: "lifestyle", price: 45, oldPrice: null, icon: "🕯️", badge: "new", rating: "★★★★★ (672)" },
    { id: 8, name: "Bamboo Yoga Mat", cat: "lifestyle", price: 68, oldPrice: 89, icon: "🧘", badge: "sale", rating: "★★★★☆ (318)" },
    { id: 9, name: "Ceramic Pour-Over Set", cat: "lifestyle", price: 79, oldPrice: null, icon: "☕", badge: null, rating: "★★★★★ (445)" },
    { id: 10, name: "Mechanical Keyboard", cat: "tech", price: 149, oldPrice: 199, icon: "⌨️", badge: "sale", rating: "★★★★★ (760)" },
    { id: 11, name: "Crossbody Canvas Bag", cat: "fashion", price: 75, oldPrice: null, icon: "👜", badge: "new", rating: "★★★★☆ (139)" },
    { id: 12, name: "Aromatherapy Diffuser", cat: "lifestyle", price: 55, oldPrice: null, icon: "🌿", badge: null, rating: "★★★★★ (503)" },
];

// Cart - stores items the user adds
var cart = [];

// Remember which filter is active
var activeFilter = "all";
// Remember current search text
var searchText = "";

// Smooth scroll down to the products section
function scrollToProducts() {
    document.getElementById("products-section").scrollIntoView({ behavior: "smooth" });
}

// Show/hide the search bar
function toggleSearch() {
    var overlay = document.getElementById("search-overlay");
    if (overlay.classList.contains("open")) {
        overlay.classList.remove("open");
    } else {
        overlay.classList.add("open");
        document.getElementById("search-input").focus();
    }
}

// Run when user types in the search bar
function searchProducts() {
    searchText = document.getElementById("search-input").value;
    renderProducts();
}

// Choose background color for each category
function getCategoryBg(cat) {
    if (cat === "tech") return "linear-gradient(135deg, #1a1a3e, #2d1b69)";
    if (cat === "fashion") return "linear-gradient(135deg, #1a0a2e, #3d0a2e)";
    if (cat === "lifestyle") return "linear-gradient(135deg, #0a1a0a, #0a2e1a)";
    return "linear-gradient(135deg, #1a1a27, #0d0d14)";
}

// Build and show product cards in the grid
function renderProducts() {
    var grid = document.getElementById("product-grid");
    var html = "";
    var count = 0;

    for (var i = 0; i < products.length; i++) {
        var p = products[i];

        // Check if this product matches the selected filter
        var matchFilter = (activeFilter === "all" || p.cat === activeFilter);
        // Check if it matches the search text
        var matchSearch = (p.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

        if (!matchFilter || !matchSearch) continue;
        count++;

        // Build the badge HTML (NEW or SALE)
        var badgeHtml = "";
        if (p.badge === "new") {
            badgeHtml = '<span class="badge-new">✦ NEW</span>';
        } else if (p.badge === "sale") {
            badgeHtml = '<span class="badge-sale">🔥 SALE</span>';
        }

        // Build the old price HTML if there is one
        var oldPriceHtml = "";
        if (p.oldPrice) {
            oldPriceHtml = '<span class="price-old">$' + p.oldPrice + '</span>';
        }

        html += '<div class="product-card">';
        html += '  <div class="product-thumb" style="background:' + getCategoryBg(p.cat) + '">';
        html += '    ' + badgeHtml;
        html += '    ' + p.icon;
        html += '  </div>';
        html += '  <div class="product-info">';
        html += '    <p class="product-cat">' + p.cat + '</p>';
        html += '    <p class="product-name">' + p.name + '</p>';
        html += '    <p class="product-rating">' + p.rating + '</p>';
        html += '    <div class="product-footer">';
        html += '      <div><span class="product-price">$' + p.price + '</span>' + oldPriceHtml + '</div>';
        html += '      <button class="add-cart-btn" onclick="addToCart(' + p.id + ')">+ Cart</button>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
    }

    if (count === 0) {
        html = '<p style="color:#64748b; padding:40px; grid-column:1/-1;">No products found.</p>';
    }

    grid.innerHTML = html;
}

// Handle category filter button clicks
var filterBtns = document.querySelectorAll(".filter-btn");
for (var i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener("click", function () {
        // Remove active from all buttons
        for (var j = 0; j < filterBtns.length; j++) {
            filterBtns[j].classList.remove("active");
        }
        this.classList.add("active");
        activeFilter = this.getAttribute("data-cat");
        renderProducts();
    });
}

// Add a product to the cart
function addToCart(productId) {
    // Find the product in our list
    var product = null;
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
            break;
        }
    }
    if (!product) return;

    // If it's already in the cart, increase quantity
    var alreadyInCart = false;
    for (var j = 0; j < cart.length; j++) {
        if (cart[j].id === productId) {
            cart[j].qty++;
            alreadyInCart = true;
            break;
        }
    }

    // Otherwise add it fresh
    if (!alreadyInCart) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            icon: product.icon,
            qty: 1
        });
    }

    updateCartUI();
    openCart();
}

// Remove an item from the cart
function removeFromCart(productId) {
    var newCart = [];
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id !== productId) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    updateCartUI();
}

// Recalculate and redraw the cart drawer
function updateCartUI() {
    // Count total items and total price
    var totalItems = 0;
    var totalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].qty;
        totalPrice += cart[i].price * cart[i].qty;
    }

    // Update the badge on the cart button
    document.getElementById("cart-count").innerText = totalItems;
    document.getElementById("cart-total").innerText = "$" + totalPrice;

    // Build cart item rows
    var itemsEl = document.getElementById("cart-items");
    if (cart.length === 0) {
        itemsEl.innerHTML = '<div class="cart-empty"><p>🛒</p><p>Your cart is empty</p></div>';
    } else {
        var html = "";
        for (var j = 0; j < cart.length; j++) {
            var item = cart[j];
            html += '<div class="cart-item">';
            html += '  <span class="cart-item-icon">' + item.icon + '</span>';
            html += '  <div class="cart-item-info">';
            html += '    <h4>' + item.name + '</h4>';
            html += '    <p>$' + item.price + ' × ' + item.qty + '</p>';
            html += '  </div>';
            html += '  <button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')">✕</button>';
            html += '</div>';
        }
        itemsEl.innerHTML = html;
    }
}

// Open the cart drawer
function openCart() {
    document.getElementById("cart-drawer").classList.add("open");
    document.getElementById("cart-backdrop").classList.add("open");
}

// Toggle the cart drawer open or closed
function toggleCart() {
    document.getElementById("cart-drawer").classList.toggle("open");
    document.getElementById("cart-backdrop").classList.toggle("open");
}

// Run on page load
renderProducts();
updateCartUI();
