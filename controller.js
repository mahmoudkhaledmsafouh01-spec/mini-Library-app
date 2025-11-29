import { Model } from "./model.js";
import { View } from "./view.js";

/* ======= ELEMENTS ======= */
const bookDialog = document.getElementById("bookDialog");
const bookForm = document.getElementById("bookForm");

const fab = document.getElementById("fab");
const cancelBtn = document.getElementById("cancelBtn");

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("sortSelect");

const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const openLogin = document.getElementById("openLogin");
const loginCancel = document.getElementById("loginCancel");

const statsModal = document.getElementById("statsModal");
const openStats = document.getElementById("openStats");
const closeStats = document.getElementById("closeStats");

const pageSound = document.getElementById("pageSound");
const fallingBooksContainer = document.getElementById("fallingBooks");

const themeToggle = document.getElementById("themeToggle");

/* ============================================================
                      INITIAL RENDER
============================================================ */
renderLibrary();
renderCategories();

/* ============================================================
                LOGIN SYSTEM (LocalStorage)
============================================================ */
openLogin.addEventListener("click", () => {
  loginModal.showModal();
});

loginCancel.addEventListener("click", () => {
  loginModal.close();
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = loginForm.username.value;
  const pass = loginForm.password.value;

  if (user.length < 3 || pass.length < 3) {
    View.toast("Username & password must be 3+ chars");
    return;
  }

  Model.setUser(user);
  loginModal.close();

  View.toast(`Welcome, ${user}!`);
});

/* ============================================================
                STATS DASHBOARD
============================================================ */
openStats.addEventListener("click", () => {
  const stats = Model.getStats();

  document.getElementById("stat-total-books").textContent =
    `Total Books: ${stats.total}`;

  document.getElementById("stat-read-books").textContent =
    `Completed: ${stats.completed}`;

  document.getElementById("stat-progress").textContent =
    `Overall Progress: ${stats.progress}%`;

  document.getElementById("stat-categories").textContent =
    `Categories: ${stats.categories.join(", ")}`;

  statsModal.showModal();
});

closeStats.addEventListener("click", () => {
  statsModal.close();
});

/* ============================================================
                ADD BOOK MODAL
============================================================ */
fab.addEventListener("click", () => {
  bookForm.reset();
  bookDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  bookDialog.close();
});

/* Save Book */
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const book = {
    title: title.value,
    author: author.value,
    pages: Number(pages.value),
    category: category.value || "General",
    read: read.checked,
    created: Date.now(),
    progress: read.checked ? 100 : 0
  };

  Model.addBook(book);
  Model.save();

  bookDialog.close();
  renderLibrary();
  renderCategories();

  pageSound.play();
  View.toast("Book added!");
});

/* ============================================================
              SEARCH / FILTER / SORT
============================================================ */
searchInput.addEventListener("input", renderLibrary);
filterSelect.addEventListener("change", renderLibrary);
sortSelect.addEventListener("change", renderLibrary);

/* ============================================================
              CATEGORY FILTERING
============================================================ */
document.getElementById("categoryBar").addEventListener("click", (e) => {
  if (e.target.classList.contains("category-tag")) {
    const category = e.target.dataset.cat;
    Model.setCategoryFilter(category);
    renderLibrary();
  }
});

/* ============================================================
              LIBRARY INTERACTIONS
============================================================ */
document.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  /* Delete */
  if (e.target.classList.contains("del-btn")) {
    Model.deleteBook(id);
    renderLibrary();
    renderCategories();
    View.toast("Book removed");
  }

  /* Toggle Read */
  if (e.target.classList.contains("read-btn")) {
    Model.toggleRead(id);
    renderLibrary();
    renderCategories();
    View.toast("Status changed");
  }
});

/* ============================================================
              THEME SWITCH
============================================================ */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

/* ============================================================
              PARALLAX SCROLL EFFECT
============================================================ */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".parallax.layer").forEach((layer) => {
    const depth = layer.classList.contains("back")
      ? 0.1
      : layer.classList.contains("mid")
      ? 0.2
      : 0.3;

    layer.style.transform = `translateY(${window.scrollY * depth}px)`;
  });
});

/* ============================================================
              FALLING BOOKS ENGINE
============================================================ */
function spawnFallingBook() {
  const book = document.createElement("img");

  book.src = BOOK_ICON;
  book.classList.add("falling-book");

  book.style.left = Math.random() * 100 + "vw";
  book.style.animationDuration = 2.5 + Math.random() * 3 + "s";

  fallingBooksContainer.appendChild(book);

  setTimeout(() => book.remove(), 6000);
}
setInterval(spawnFallingBook, 1500);


/* ============================================================
              RENDER LIBRARY + CATEGORIES
============================================================ */
function renderLibrary() {
  const books = Model.getFilteredBooks({
    search: searchInput.value,
    filter: filterSelect.value,
    sort: sortSelect.value,
  });

  View.renderLibrary(books);
}

function renderCategories() {
  const cats = Model.getCategories();
  View.renderCategories(cats);
}
