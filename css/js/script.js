// Get stored items
let items = [];

try {
    const storedItems = localStorage.getItem("lostFoundItems");
    items = storedItems ? JSON.parse(storedItems) : [];
} catch (error) {
    console.error("Unable to parse saved lost-and-found items.", error);
}

// If no items exist, add sample items
if (items.length === 0) {

    items = [
        {
            name: "iPhone 13",
            location: "College Library",
            type: "lost",
            icon: "📱"
        },
        {
            name: "Black Backpack",
            location: "Block B",
            type: "found",
            icon: "🎒"
        },
        {
            name: "Keychain",
            location: "College Canteen",
            type: "lost",
            icon: "🔑"
        }
    ];

    localStorage.setItem("lostFoundItems", JSON.stringify(items));
}


// Count items
let lostItems = items.filter(item => item.type === "lost");
let foundItems = items.filter(item => item.type === "found");


// Update dashboard numbers
document.getElementById("lostCount").textContent = lostItems.length;

document.getElementById("foundCount").textContent = foundItems.length;

document.getElementById("totalCount").textContent = items.length;


// Display recent items
let recentContainer = document.getElementById("recentItems");

if (recentContainer) {

    recentContainer.innerHTML = "";

    items.slice(-6).reverse().forEach(item => {

        let div = document.createElement("div");

        div.className = "item";

        div.innerHTML = `
            <div class="item-icon">${item.icon || "📦"}</div>

            <h3>${item.name}</h3>

            <p>📍 ${item.location}</p>

            <span class="badge ${item.type}">
                ${item.type === "lost" ? "Lost" : "Found"}
            </span>
        `;

        recentContainer.appendChild(div);

    });
}