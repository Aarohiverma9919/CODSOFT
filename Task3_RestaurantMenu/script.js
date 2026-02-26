// Task 3 - Restaurant Menu Script
// This file handles: category filtering, search, and the item modal

// All menu items stored as a list of objects
var menuItems = [
    { id: 1, name: "Bruschetta al Pomodoro", cat: "starters", desc: "Toasted sourdough topped with fresh tomatoes, basil, garlic, and a drizzle of aged balsamic.", price: "$9", icon: "🍞" },
    { id: 2, name: "Crispy Calamari", cat: "starters", desc: "Golden fried squid rings with house-made aioli and a wedge of lemon.", price: "$13", icon: "🦑" },
    { id: 3, name: "Truffle Arancini", cat: "starters", desc: "Saffron risotto balls stuffed with mozzarella, fried crisp, served with truffle mayo.", price: "$14", icon: "🧆" },
    { id: 4, name: "Braised Short Rib", cat: "mains", desc: "12-hour slow-braised beef rib in red wine, served with buttery mashed potato and seasonal greens.", price: "$32", icon: "🥩" },
    { id: 5, name: "Pan-Seared Salmon", cat: "mains", desc: "Atlantic salmon with lemon-caper butter, asparagus, and wild rice.", price: "$28", icon: "🐟" },
    { id: 6, name: "Wild Mushroom Risotto", cat: "mains", desc: "Creamy Arborio rice with porcini, shiitake, Parmesan, and fresh thyme.", price: "$22", icon: "🍄" },
    { id: 7, name: "Grilled Lamb Chops", cat: "mains", desc: "French-trimmed lamb with chimichurri, roasted baby potatoes, and a red wine jus.", price: "$36", icon: "🍖" },
    { id: 8, name: "Lava Chocolate Cake", cat: "desserts", desc: "Warm dark chocolate fondant with a molten centre, vanilla ice cream and gold dust.", price: "$11", icon: "🍫" },
    { id: 9, name: "Tiramisu Classico", cat: "desserts", desc: "Layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa powder.", price: "$10", icon: "☕" },
    { id: 10, name: "Mango Panna Cotta", cat: "desserts", desc: "Silky panna cotta topped with tropical mango coulis and toasted coconut.", price: "$9", icon: "🥭" },
    { id: 11, name: "Signature Ember Cocktail", cat: "drinks", desc: "House blend of aged bourbon, honey syrup, fresh orange, smoked with applewood.", price: "$14", icon: "🍹" },
    { id: 12, name: "Cold Brew Latte", cat: "drinks", desc: "18-hour cold brew espresso over oat milk with a hint of vanilla.", price: "$7", icon: "🧊" },
    { id: 13, name: "Fresh Mint Lemonade", cat: "drinks", desc: "Freshly squeezed lemon with garden mint, honey, and still sparkling water.", price: "$6", icon: "🍋" },
];

// Keep track of which category is selected
var currentCategory = "all";

// Build and show menu cards in the grid
function renderMenu(items) {
    var grid = document.getElementById("menu-grid");

    // If nothing matches, show a message
    if (items.length === 0) {
        grid.innerHTML = '<div class="no-results">😔 No dishes found. Try a different search.</div>';
        return;
    }

    // Otherwise build a card for each item
    var html = "";
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        html += '<div class="menu-card" onclick="openModal(' + item.id + ')">';
        html += '  <div class="card-img-placeholder">' + item.icon + '</div>';
        html += '  <div class="card-body">';
        html += '    <p class="card-category">' + item.cat + '</p>';
        html += '    <h3>' + item.name + '</h3>';
        html += '    <p>' + item.desc + '</p>';
        html += '    <div class="card-footer">';
        html += '      <span class="price">' + item.price + '</span>';
        html += '      <button class="add-btn" onclick="event.stopPropagation()">+ Add</button>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
    }
    grid.innerHTML = html;
}

// Filter items based on selected category and search text
function filterMenu() {
    var searchText = document.getElementById("search").value.toLowerCase();
    var filtered = [];

    for (var i = 0; i < menuItems.length; i++) {
        var item = menuItems[i];
        var matchesCategory = (currentCategory === "all" || item.cat === currentCategory);
        var matchesSearch = (item.name.toLowerCase().indexOf(searchText) !== -1 || item.desc.toLowerCase().indexOf(searchText) !== -1);

        if (matchesCategory && matchesSearch) {
            filtered.push(item);
        }
    }

    renderMenu(filtered);
}

// Set up category button clicks
var categoryButtons = document.querySelectorAll(".cat-btn");
for (var k = 0; k < categoryButtons.length; k++) {
    categoryButtons[k].addEventListener("click", function () {
        // Remove active from all buttons
        for (var m = 0; m < categoryButtons.length; m++) {
            categoryButtons[m].classList.remove("active");
        }
        // Set clicked one as active
        this.classList.add("active");
        currentCategory = this.getAttribute("data-cat");
        filterMenu();
    });
}

// Open the detail modal for a given item
function openModal(id) {
    var item = null;
    for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].id === id) {
            item = menuItems[i];
            break;
        }
    }

    if (!item) return;

    document.getElementById("modal-name").innerText = item.name;
    document.getElementById("modal-desc").innerText = item.desc;
    document.getElementById("modal-price").innerText = item.price;
    document.getElementById("modal-img").innerText = item.icon;

    document.getElementById("modal-overlay").classList.add("open");
}

// Close the modal
function closeModal() {
    document.getElementById("modal-overlay").classList.remove("open");
}

// First load — show everything
renderMenu(menuItems);
