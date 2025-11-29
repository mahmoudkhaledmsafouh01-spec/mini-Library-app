export const View = {
  library: document.getElementById("library"),
  categoryBar: document.getElementById("categoryBar"),
  toastBox: document.getElementById("toast"),

  /* ============================================================
                        RENDER LIBRARY
  ============================================================ */
  renderLibrary(books) {
    this.library.innerHTML = "";

    books.forEach(book => {
      const card = document.createElement("div");
      card.className = "book-card neon-hover";

      card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Category:</strong> ${book.category}</p>
        <p><strong>Status:</strong> ${book.read ? "✔ Read" : "❌ Not Read"}</p>

        <div class="progress-box">
          <div 
            class="progress" 
            style="width: ${book.progress}%; background:${
              book.progress === 100 ? "#22c55e" : "#3b82f6"
            }"
          ></div>
        </div>

        <div class="actions">
          <button class="read-btn" data-id="${book.id}">Toggle</button>
          <button class="del-btn" data-id="${book.id}">Delete</button>
        </div>
      `;

      this.library.appendChild(card);
    });
  },

  /* ============================================================
                        RENDER CATEGORIES
  ============================================================ */
  renderCategories(categories) {
    this.categoryBar.innerHTML = "";

    categories.forEach(cat => {
      const tag = document.createElement("div");
      tag.className = "category-tag neon-hover";
      tag.dataset.cat = cat;
      tag.textContent = cat;
      this.categoryBar.appendChild(tag);
    });
  },

  /* ============================================================
                        TOAST MESSAGES
  ============================================================ */
  toast(msg) {
    this.toastBox.textContent = msg;
    this.toastBox.classList.add("show");

    setTimeout(() => {
      this.toastBox.classList.remove("show");
    }, 2000);
  },

  /* ============================================================
                        FALLING BOOK HELPER
  ============================================================ */
  spawnFallingBook(imgData) {
    const book = document.createElement("img");
    book.src = imgData;
    book.className = "falling-book";

    book.style.left = Math.random() * 100 + "vw";
    book.style.animationDuration = 3 + Math.random() * 2 + "s";

    document.getElementById("fallingBooks").appendChild(book);

    setTimeout(() => book.remove(), 6000);
  }
};
