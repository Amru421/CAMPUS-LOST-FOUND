const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const projectRoot = path.join(__dirname, "..");
const scriptPath = path.join(projectRoot, "css", "js", "script.js");
const dashboardScript = fs.readFileSync(scriptPath, "utf8");

function runDashboard({ storedValue = null, readError, writeError, missingElements = [] } = {}) {
    const logs = [];
    const writes = [];
    const elements = new Map();

    function createElement(tagName) {
        return {
            tagName,
            className: "",
            children: [],
            textContent: "",
            append(...children) {
                this.children.push(...children);
            },
            appendChild(child) {
                this.children.push(child);
            }
        };
    }

    for (const id of ["lostCount", "foundCount", "totalCount", "recentItems"]) {
        if (missingElements.includes(id)) {
            continue;
        }

        const element = createElement(id === "recentItems" ? "div" : "span");
        element.innerHTML = "";
        elements.set(id, element);
    }

    const localStorage = {
        getItem() {
            if (readError) {
                throw readError;
            }

            return storedValue;
        },
        setItem(key, value) {
            if (writeError) {
                throw writeError;
            }

            writes.push({ key, value });
        }
    };

    const document = {
        getElementById(id) {
            return elements.get(id) || null;
        },
        createElement
    };

    vm.runInNewContext(dashboardScript, {
        document,
        localStorage,
        console: {
            error: (...args) => logs.push({ level: "error", args }),
            warn: (...args) => logs.push({ level: "warn", args })
        }
    });

    return { elements, logs, writes };
}

test("dashboard loads the script from the file's actual path", () => {
    const html = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
    const scriptReference = html.match(/<script src="([^"]+)"/);

    assert.ok(scriptReference);
    assert.equal(fs.existsSync(path.join(projectRoot, scriptReference[1])), true);
});

test("malformed saved JSON recovers with sample items", () => {
    const dashboard = runDashboard({ storedValue: "{" });

    assert.equal(dashboard.elements.get("totalCount").textContent, 3);
    assert.equal(dashboard.logs[0].level, "error");
});

test("a saved empty list stays empty instead of reseeding samples", () => {
    const dashboard = runDashboard({ storedValue: "[]" });

    assert.equal(dashboard.elements.get("totalCount").textContent, 0);
    assert.equal(dashboard.elements.get("recentItems").children.length, 0);
    assert.equal(dashboard.writes.length, 0);
});

test("invalid list shapes and records do not crash dashboard counts", () => {
    const invalidShape = runDashboard({ storedValue: JSON.stringify({ name: "not a list" }) });
    assert.equal(invalidShape.elements.get("totalCount").textContent, 0);

    const invalidRecords = runDashboard({
        storedValue: JSON.stringify([
            { name: "Wallet", location: "Library", type: "lost" },
            { name: "Unknown", location: "Canteen", type: "other" }
        ])
    });
    assert.equal(invalidRecords.elements.get("lostCount").textContent, 1);
    assert.equal(invalidRecords.elements.get("totalCount").textContent, 1);
    assert.ok(invalidRecords.logs.some(log => log.level === "warn"));
});

test("item values are rendered as text, not interpreted as HTML", () => {
    const dashboard = runDashboard({
        storedValue: JSON.stringify([{
            name: "<img src=x onerror=alert(1)>",
            location: "<script>boom</script>",
            icon: "<svg onload=alert(1)>",
            type: "lost"
        }])
    });

    const card = dashboard.elements.get("recentItems").children[0];

    assert.equal(card.children[0].textContent, "<svg onload=alert(1)>");
    assert.equal(card.children[1].textContent, "<img src=x onerror=alert(1)>");
    assert.equal(card.children[2].textContent, "📍 <script>boom</script>");
    assert.equal(card.children[3].textContent, "Lost");
});

test("storage write errors and missing dashboard elements are handled", () => {
    const dashboard = runDashboard({
        writeError: new Error("storage full"),
        missingElements: ["lostCount", "foundCount", "totalCount", "recentItems"]
    });

    assert.ok(dashboard.logs.some(log => log.args[0] === "Unable to save sample lost-and-found items."));
});
