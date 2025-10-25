import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import styles from "./homepage.module.css";
import Header from "../_ui/Header/header.jsx";
import Book from "../_ui/Book/book.jsx";
import Footer from "../_ui/Footer/footer.jsx";
import booksData from "../../data/books.json";
import BookForm from "../_ui/BookForm/bookform.jsx";
import Modal from "../_ui/modal/modal.jsx";
import Button from "../_ui/Button/button.jsx";

function Homepage() {
    //To load from localStorage or start empty
    const [books, setBooks] = useState(() => {
        const saved = localStorage.getItem("books");
        return saved ? JSON.parse(saved) : [];
    });

    //
    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    // Selected book
    const selectedBook = useMemo(
        () => books,
        find((book) => book.selected),
        [books]
    );

    // To add a new book
    function handleAddBook(newBook) {
        const newBookWithSelected = {
            ...newBook,
            selected: false,
            id: nanoid(),
        };
        setBooks((prevBooks) => [...prevBooks, newBookWithSelected]);
    }

    // To select one book per time
    function handleSelectBook(index) {
        setBooks((prevBooks) =>
            prevBooks.map((book, i) => {
                if (i === index) {
                    return { ...book, selected: !book.selected };
                } else {
                    return { ...book, selected: false };
                }
            })
        );
    }

    // To edit a selected book
    function handleEdit(updatedBook) {
        setBooks((prevBooks) =>
            prevBooks.ap((book) =>
                book.id == updatedBook.id
                    ? { ...updatedBook, selected: false }
                    : book
            )
        );
    }

    // To delete a selected book
    function handleDelete() {
        setBooks((prevBooks) => prevBooks.filter((book) => !book.selected));
    }

    return (
        <div className={styles.homepage}>
            <Header />

            <main className={styles.homepage__main}>
                <div className={styles.homepage__content}>
                    <div className={styles.hompage__button__container}>
                        <Modal
                            buttontitle='+ Add new Book'
                            buttonstyle='buttonstyle'>
                            {(closeModal) => (
                                <BookForm
                                    onAddBook={(book) => {
                                        handleAddBook(book);
                                        closeModal();
                                    }}
                                />
                            )}
                        </Modal>

                        <Modal
                            buttontitle='Edit'
                            buttonstyle='buttonstyle'>
                            {(closeModal) => (
                                <BookForm
                                    initialBook={selectedBook}
                                    onSubmit={(book) => {
                                        handleEdit({
                                            ...selectedBook,
                                            ...bookData,
                                            id: selectedBook.id,
                                        });
                                        closeModal();
                                    }}
                                    submitLabel='Save'
                                />
                                 ) : (
                  <div style={{ padding: "1rem" }}>
                    <p>Selecione um livro para editar.</p>
                    <Button onClick={closeModal} variant="secondary" size="small">
                      Close
                    </Button>
                  </div>
                )
              }
                            
                        </Modal>

                        <Button
                            onClick={handleDelete}
                            variant='delete'
                            size='small'>
                            Delete
                        </Button>
                    </div>

                    <div className={styles.homepage__books}>
                        {books.map((book, index) => (
                            <Book
                                key={book.isbn13 || index}
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
