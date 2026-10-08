# 🎓 Campus Lost & Found

A simple and user-friendly web application that helps college students **report, search, and manage lost and found items on campus**.

## 📌 Project Overview

Students often lose personal belongings such as mobile phones, ID cards, wallets, keys, books, and bags inside college campuses.

The **Campus Lost & Found** website provides a central platform where students can report lost or found items and easily view the latest reports.

The project includes a dashboard that displays the total number of lost and found items.

## ✨ Features

* 🏠 Interactive dashboard
* 🔴 Report a lost item
* 🟢 Report a found item
* 📋 View all reported items
* 🔍 Search for lost and found items
* 📊 Display total lost items
* 📦 Display total found items
* 📈 Display total number of items
* 📱 Responsive design
* 💾 Store item information using browser LocalStorage
* 🎨 Clean and simple user interface

## 🖥️ Dashboard

The dashboard displays:

* **Lost Items** – Number of reported lost items
* **Found Items** – Number of reported found items
* **Total Items** – Total lost + found items
* **Recent Items** – Recently reported items
* **Quick Actions** – Buttons to report lost or found items

## 🛠️ Technologies Used

| Technology   | Purpose                        |
| ------------ | ------------------------------ |
| HTML5        | Website structure              |
| CSS3         | Styling and responsive design  |
| JavaScript   | Functionality and dynamic data |
| LocalStorage | Storing item information       |
| VS Code      | Development environment        |
| Git & GitHub | Version control                |

## 📁 Project Structure

```text
Campus-Lost-Found/
│
├── index.html
├── items.html
├── report-lost.html
├── report-found.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── images/
│
└── README.md
```

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/Campus-Lost-Found.git
```

### 2. Open the project

Open the project folder in **VS Code**.

### 3. Run the website

Open:

```text
index.html
```

You can use the **Live Server** extension in VS Code for a better development experience.

## 📊 Dashboard Working

The dashboard automatically calculates the number of items.

Example:

```text
Lost Items  = 2
Found Items = 1
Total Items = 3
```

When a new item is added, the dashboard can be updated using JavaScript and LocalStorage.

## 💾 LocalStorage

The project uses browser **LocalStorage** to store lost and found item information.

This means the data can remain available even after refreshing the webpage.

Example data:

```javascript
{
    name: "iPhone 13",
    location: "College Library",
    type: "lost",
    icon: "📱"
}
```

## 🎯 Future Improvements

The project can be extended with:

* 👤 Student login and registration
* 📷 Image upload for items
* 🔍 Advanced search and filtering
* 📍 GPS/location support
* 📧 Email notifications
* 💬 Contact owner/finder
* ☁️ Cloud database
* 🔐 User authentication
* 📱 Mobile application
* 🤖 AI-based item matching

## 🎓 Use Case

This project can be useful for:

* College campuses
* Universities
* Hostels
* Libraries
* Student communities
* Educational institutions

## 👩‍💻 Developer

**Varsha R**

Student Developer | Web Development & Technology Enthusiast

## ⭐ Project Goal

The goal of this project is to create a simple digital platform that makes it easier for students to **report lost belongings, report found items, and reconnect lost items with their owners**.

---

⭐ If you find this project useful, consider giving the repository a **star** on GitHub.
