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
    //To load from localStorage or start empty
    const [books, setBooks] = useState(() => {
        const savedBooks = localStorage.getItem("books");
        if (savedBooks) return JSON.parse(savedBooks);
        else return [];
    });

    // Keeps it into the localStorage
    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    // ===== Seleção de livro =====
    const [selectedBookId, setSelectedBookId] = useState(null);

    // ===== Filtro por idioma =====
    const [filter, setFilter] = useState("");
    const displayedBooks =
        filter === "" ? books : books.filter((b) => b.language === filter);

    // Opções de idioma (derivadas da lista)
    const languageOptions = Array.from(
        new Set(books.map((b) => b.language))
    ).sort();

    // ===== Ações =====
    const handleDelete = () => {
        if (!selectedBookId) return; // segurança extra
        setBooks((prev) => prev.filter((b) => b.id !== selectedBookId));
        setSelectedBookId(null);
    };

    return (
        <div className={styles.homepage}>
            <Header />

            {/* FILTER OPTION */}
            <div className={styles.filter}>
                Languages:
                <select
                    className={styles.filter_select}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}>
                    <option value=''>All</option>
                    {languageOptions.map((lang) => (
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
                        {/* ADD A NEW BOOK */}
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

                        {/* EDIT A SELECTED BOOK */}
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

                        {/* DELETE A SELECTED BOOK */}
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

                    <div className={styles.homepage__books}>
                        {books.map((book, index) => (
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
