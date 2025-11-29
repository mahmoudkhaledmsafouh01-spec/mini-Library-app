export const Model = {
  /* ============================================================
                      INITIAL DATA
  ============================================================ */
  data: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    books: JSON.parse(localStorage.getItem("books")) || [],
    categoryFilter: "all",
  },

  /* ============================================================
                      SAVE TO STORAGE
  ============================================================ */
  save() {
    localStorage.setItem("books", JSON.stringify(this.data.books));
    localStorage.setItem("user", JSON.stringify(this.data.user));
  },

  /* ============================================================
                      USER SYSTEM
  ============================================================ */
  setUser(username) {
    this.data.user = username;
    this.save();
  },

  getUser() {
    return this.data.user;
  },

  /* ============================================================
                      BOOK CRUD
  ============================================================ */
  addBook(book) {
    this.data.books.push({
      id: Date.now(),
      ...book
    });
    this.save();
  },

  deleteBook(id) {
    this.data.books = this.data.books.filter(b => b.id !== id);
    this.save();
  },

  toggleRead(id) {
    const book = this.data.books.find(b => b.id === id);
    if (book) {
      book.read = !book.read;
      book.progress = book.read ? 100 : 0;
    }
    this.save();
  },

  /* ============================================================
                      SORT / FILTER / SEARCH
  ============================================================ */
  setCategoryFilter(cat) {
    this.data.categoryFilter = cat;
  },

  getFilteredBooks(options) {
    let books = [...this.data.books];

    /* Search */
    const search = options.search?.toLowerCase() || "";
    if (search.length) {
      books = books.filter(b =>
        b.title.toLowerCase().includes(search) ||
        b.author.toLowerCase().includes(search) ||
        b.category.toLowerCase().includes(search)
      );
    }

    /* Read Filter */
    if (options.filter === "read") {
      books = books.filter(b => b.read);
    }
    if (options.filter === "unread") {
      books = books.filter(b => !b.read);
    }

    /* Category Filter */
    if (this.data.categoryFilter !== "all") {
      books = books.filter(b => b.category === this.data.categoryFilter);
    }

    /* Sorting */
    if (options.sort === "az") {
      books.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (options.sort === "za") {
      books.sort((a, b) => b.title.localeCompare(a.title));
    }
    if (options.sort === "recent") {
      books.sort((a, b) => b.id - a.id);
    }

    return books;
  },

  /* ============================================================
                      CATEGORY SYSTEM
  ============================================================ */
  getCategories() {
    const categories = new Set(this.data.books.map(b => b.category));
    return ["all", ...categories];
  },

  /* ============================================================
                      STATS ENGINE
  ============================================================ */
  getStats() {
    const total = this.data.books.length;
    const completed = this.data.books.filter(b => b.read).length;

    const progress =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    const categories = [...new Set(this.data.books.map(b => b.category))];

    return {
      total,
      completed,
      progress,
      categories,
    };
  },
};
