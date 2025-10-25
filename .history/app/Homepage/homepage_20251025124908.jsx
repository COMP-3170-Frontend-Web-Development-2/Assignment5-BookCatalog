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
    // Carregar/salvar no localStorage
    const [books, setBooks] = useState(() => {
        const saved = localStorage.getItem("books");
        return saved ? JSON.parse(saved) : [];
    });

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
        <div className={styles.page}>
            <Header />

            {/* Filtro por idioma */}
            <div className={styles.toolbar}>
                <label className={styles.filterLabel}>
                    Idioma:
                    <select
                        className={styles.select}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}>
                        <option value=''>Todos</option>
                        {languageOptions.map((lang) => (
                            <option
                                key={lang}
                                value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Botão Delete desabilita quando nada selecionado */}
                <Button
                    type='warning'
                    value='Delete'
                    isDisabled={!selectedBookId}
                    onClick={handleDelete}
                />
            </div>

            {/* Lista de livros exibindo somente os filtrados */}
            <div className={styles.grid}>
                {displayedBooks.map((book) => (
                    <Book
                        key={book.id}
                        book={book}
                        isSelected={book.id === selectedBookId}
                        onClick={() =>
                            setSelectedBookId((prev) =>
                                prev === book.id ? null : book.id
                            )
                        }
                    />
                ))}
                {displayedBooks.length === 0 && (
                    <div className={styles.empty}>
                        Nenhum livro encontrado para o filtro.
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default Homepage;
