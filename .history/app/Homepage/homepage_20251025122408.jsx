import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import styles from "./homepage.module.css";
import Header from "../_ui/Header/header.jsx";
import Book from "../_ui/Book/book.jsx";
import Footer from "../_ui/Footer/footer.jsx";
import BookForm from "../_ui/BookForm/bookform.jsx";
import Modal from "../_ui/modal/modal.jsx";
import Button from "../_ui/Button/button.jsx";
import buttonStyles from "../_ui/Button/button.module.css";

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
        filter === "" ? books : books.filter((book) => book.language === filter);

    // Keeps it into the localStorage
    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    // To add a new book
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
        setBooks((prev) => prev.map((b) => (b.id === selected.id ? edited : b)));
    }

    // To delete a selected book
    function handleDelete(id) {
        setBooks((prev) => prev.filter((b) => b.id !== id));
    }

    // To select one book per time
    function handleSelectBook(index) {
        setBooks((prev) =>
            prev.map((book, i) =>
                i === index ? { ...book, selected: !book.selected } : { ...book, selected: false }
