import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import styles from "./homepage.module.css";
import Header from "../_ui/Header/header.jsx";
import Book from "../_ui/Book/book.jsx";
import Footer from "../_ui/Footer/footer.jsx";
import BookForm from "../_ui/BookForm/bookform.jsx";
import Modal from "../_ui/modal/modal.jsx";
import Button from "../_ui/Button/button.jsx";

function Homepage() {
    // Load from localStorage or start empty
    const [books, setBooks] = useState(() => {
        const savedBooks = localStorage.getItem("books");
        return savedBooks ? JSON.parse(savedBooks) : [];
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    // Filter by language
    const [filter, setFilter] = useState("");
    const languages = [
        ...new Set(books.map((b) => b?.language).filter(Boolean)),
    ];

    // Filtered books
    const displayedBooks =
        filter === ""
            ? books
            : books.filter((book) => book.language === filter);

    // Add new book
    function handleAddBook(bookData) {
        const newBook = {
            id: nanoid(),
            selected: false,
            title: bookData.title,
            author: bookData.author,
            publisher: bookData.publisher,
            year: bookData.year,
            language: bookData.language,
            pages: bookData.pages,
            image: bookData.url || "https://placehold.co/150x200",
            price: "$0.00",
            url: bookData.url || "#",
        };
        setBooks((prev) => [...prev, newBook]);
        if (bookData.onReset) bookData.onReset();
    }

    // Edit selected book
    function handleEdit(updatedBook) {
        const selected = books.find((b) => b.selected);
        if (!selected) return;

        const edited = {
            ...selected,
            ...updatedBook,
            image: updatedBook?.url || selected.image,
            url: updatedBook?.url ?? selected.url,
        };
        setBooks((prev) =>
            prev.map((b) => (b.id === selected.id ? edited : b))
        );
    }

    // Delete selected book
    function handleDelete(id) {
        setBooks((prev) => prev.filter((b) => b.id !== id));
    }

    // Select one book at a time
    function handleSelectBook(index) {
        setBooks((prev) =>
            prev.map((book, i) =>
                i === index
                    ? { ...book, selected: !book.selected }
                    : { ...book, selected: false }
            )
        );
    }

    const selectedBook = books.find((b) => b.selected);

    return (
        <div className={styles.homepage}>
            <Header />

            {/* FILTER OPT*/}
            <div className={styles.filter}>
                <label>Filter by language: </label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}>
                    <option value=''>All</option>
                    {languages.map((lang) => (
                        <option
                            key={lang}
                            value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
            </div>

            <main className={styles.homepage__main}>
                <div className={styles.homepage__content}>
                    <div className={styles.hompage__button__container}>
                        {/* ADD A NEW BOOK MODAL*/}
                        <Modal
                            buttontitle='+ Add new Book'
                            variant='add'>
                            {(close) => (
                                <BookForm
                                    onSubmit={(data) => {
                                        handleAddBook(data);
                                        close();
                                    }}
                                    submitLabel='Add Book'
                                />
                            )}
                        </Modal>

                        {/* EDIT SELECTED BOOK MODAL */}
                        <Modal
                            buttontitle='Edit'
                            variant='edit'
                            disabled={!selectedBook}>
                            {(close) => (
                                <BookForm
                                    initialBook={selectedBook}
                                    onSubmit={(data) => {
                                        handleEdit(data);
                                        close();
                                    }}
                                    submitLabel='Save'
                                />
                            )}
                        </Modal>

                        {/* DELETE BUTTON */}
                        <Button
                            onClick={() =>
                                selectedBook && handleDelete(selectedBook.id)
                            }
                            variant='delete'
                            size='small'
                            disabled={!selectedBook}
                            style={{
                                opacity: selectedBook ? 1 : 0.6,
                                pointerEvents: selectedBook ? "auto" : "none",
                            }}>
                            Delete
                        </Button>
                    </div>

                    {/* DISPLAYED BOOKS BY FILTER */}
                    <div className={styles.homepage__books}>
                        {displayedBooks.map((book, index) => (
                            <Book
                                key={book.isbn13 || book.id || index}
                                book={book}
                                onClick={() => handleSelectBook(index)}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Homepage;
