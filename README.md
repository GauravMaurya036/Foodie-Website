# 🍔 Foodie — Responsive Food Ordering Website

A simple, responsive food-ordering front-end built with **HTML**, **CSS**, and **Vanilla JavaScript**. The project dynamically fetches menu items from **TheMealDB API** and provides interactive cart functionality.

Live Demo: [Foodie Website on Vercel](https://foodie-website-gamma.vercel.app/)

---

## 🔎 Overview

This project demonstrates a clean, mobile-first UI for browsing food items and adding them to a cart. The menu cards are **loaded dynamically at runtime** via the TheMealDB API (Indian cuisine). The fetch is implemented in `main.js` (see `initApp()`), which pulls data from:

```
https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian
```

If you need an offline or custom-data fallback, you can replace that fetch with a local `product.json` and adjust `initApp()` accordingly.

---

## ✨ Features

* Responsive layout (desktop + mobile)
* Hamburger mobile menu
* Hero section with image and CTA
* **Dynamic Menu** fetched from TheMealDB API
* Add-to-Cart with quantity controls and real-time total
* Cart slide panel (cart count & total)
* Reviews carousel (Swiper.js)
* Newsletter subscribe field

---

## 🧰 Tech Stack

* HTML5
* CSS3
* JavaScript (ES6)
* [Font Awesome](https://fontawesome.com/) for icons
* [Swiper.js](https://swiperjs.com/) for the review carousel
* TheMealDB public API for sample meal data

---

## 📁 Project Structure

```
Foodie-Website/
├─ index.html        # Main page
├─ style.css         # Styles
├─ main.js           # JS logic (fetch + cart logic)
├─ IMG/              # Images used by the site
└─ README.md         # This file
```

---

## 🚀 Run Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/Foodie-Website.git
cd Foodie-Website
```

2. Open `index.html` in your browser (double-click or right-click → Open with...).

**Optional (recommended)** — run a local dev server for absolute paths and better dev experience:

```bash
# using npm's live-server (if installed globally)
live-server

# or use VS Code Live Server extension
```

---

## ⚙️ Notes about the API & Offline Mode

* `main.js` uses `fetch()` to get a list of meals from TheMealDB. The app maps those results into `productList` entries with `id`, `name`, `price`, and `image`.
* If you want to use custom data or run the site without internet:

  1. Create a `product.json` file with an array of products (id, name, price, image).
  2. Replace the API `fetch(...)` call in `initApp()` with `fetch('product.json')` (the project already contains a commented example in `main.js`).

Example product item format used in the code:

```json
{
  "id": 1,
  "name": "Double Beef Burger",
  "price": "₹250",
  "image": "IMG/burger.png"
}
```

## ♻️ Future Improvements

* Checkout & payment flow
* Admin dashboard to add/edit menu items
* Login & user orders
* Save cart to localStorage or backend
* Search & filter for menu items
* Accessibility improvements and a11y audit

---

## 🤝 Contributing

Contributions are welcome — fork the repo and open a pull request with improvements or bug fixes.
---


