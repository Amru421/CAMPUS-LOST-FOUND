// Get stored items
let items = [];

try {
    const storedItems = localStorage.getItem("lostFoundItems");
    items = storedItems ? JSON.parse(storedItems) : [];
} catch (error) {
    console.error("Unable to parse saved lost-and-found items.", error);
}

if (!Array.isArray(items)) {
    console.error("Saved lost-and-found items must be an array.");
    items = [];
}

const validItems = items.filter(item =>
    item &&
    typeof item === "object" &&
    !Array.isArray(item) &&
    typeof item.name === "string" &&
    item.name.trim() &&
    typeof item.location === "string" &&
    item.location.trim() &&
    (item.type === "lost" || item.type === "found")
);

if (validItems.length !== items.length) {
    console.warn("Ignored invalid saved lost-and-found items.");
}

items = validItems;


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

        const icon = document.createElement("div");
        icon.className = "item-icon";
        icon.textContent = typeof item.icon === "string" && item.icon ? item.icon : "📦";

        const name = document.createElement("h3");
        name.textContent = item.name;

        const location = document.createElement("p");
        location.textContent = `📍 ${item.location}`;

        const badge = document.createElement("span");
        badge.className = `badge ${item.type}`;
        badge.textContent = item.type === "lost" ? "Lost" : "Found";

        div.append(icon, name, location, badge);

        recentContainer.appendChild(div);

    });
}