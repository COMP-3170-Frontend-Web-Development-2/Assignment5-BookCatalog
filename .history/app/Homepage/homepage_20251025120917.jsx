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

    // Filter by language
    const [filter, setFilter] = useState("");

    // Lis of books after filter applied
    const displayedBooks =
        filter === ""
            ? books
            : books.filter((book) => book.language === filter);

    // Keeps it into the localStorage
    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    // To add a new book
    function handleAddBook(formData) {
        const newBook = {
            id: nanoid(),
            selected: false,
            title: formData.title,
            author: formData.author,
            publisher: formData.publisher,
            year: formData.year,
            language: formData.language,
            pages: formData.pages,
            image: formData.url || "https://placehold.co/150x200",
            price: "$0.00",
            url: formData.url || "#",
        };
        setBooks((prev) => [...prev, newBook]);
    }

    // To edit a selected book
     function handleEdit(updatedBook) {
    const selected = books.find((b) => b.selected);
    if (!selected) return;

    const edited = {
      ...selected,
      ...updatedBook,
      image: updatedBook?.url || selected.image,
      url: updatedBook?.url ?? selected.url,
    };

    // To delete a selected book
    function handleDelete(id) {
        const editedBooks = books.filter((book) => book.id !== id);
        setBooks(editedBooks);
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

    const language = new Set(books.map((book) => book?.language));

    return (
        <div className={styles.homepage}>
            <Header />

            <div className={styles.filter}>
                Languages:
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}>
                    <option value=''>All</option>
                    {[...language].map((language) => (
                        <option value={language}>{language}</option>
                    ))}
                </select>
            </div>

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
                            buttonstyle=''>
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
                            )}
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
                                key={book.id || index}
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
