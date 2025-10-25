import { useState } from "react";
import styles from "./bookform.module.css";

function BookForm({
    initialBook,
    onSubmit,
    submitLabel = "Save",
    onAddBook,
    onClose,
}) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn13: "",
        publisher: "",
        year: "",
        language: "",
        pages: "",
        url: "",
    });

    useEffect(() => {
        if (initialBook) {
            setForm({
                title: initialBook.title || "",
                author: initialBook.author || "",
                isbn13: initialBook.isbn13 || "",
                description: initialBook.description || "",
                image: initialBook.image || "",
                category: initialBook.category || "",
            });
        }
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newBook = {
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

        onAddBook(newBook);

        // limpa o formulário
        setFormData({
            title: "",
            author: "",
            publisher: "",
            year: "",
            language: "",
            pages: "",
        });

        if (onClose) onClose();
    }

    return (
        <div className={styles.form_container}>
            <h2 className={styles.form_title}>Add new book</h2>

            <form onSubmit={handleSubmit}>
                <div className={styles.form_control}>
                    <label
                        className={styles.form_label}
                        htmlFor='title'>
                        Book Title:
                    </label>
                    <input
                        className={styles.form_input}
                        type='text'
                        name='title'
                        placeholder='Book Title'
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.form_control}>
                    <label
                        className={styles.form_label}
                        htmlFor='author'>
                        Author:
                    </label>
                    <input
                        className={styles.form_input}
                        type='text'
                        name='author'
                        value={formData.author}
                        onChange={handleChange}
                        placeholder='Author'
                        required
                    />
                </div>

                <div className={styles.form_control}>
                    <label
                        className={styles.form_label}
                        htmlFor='publisher'>
                        Publisher:
                    </label>
                    <input
                        className={styles.form_input}
                        type='text'
                        name='publisher'
                        value={formData.publisher}
                        onChange={handleChange}
                        placeholder='Publisher'
                    />
                </div>

                <div className={styles.form_control}>
                    <label
                        className={styles.form_label}
                        htmlFor='year'>
                        Publication Year:
                    </label>
                    <input
                        className={styles.form_input}
                        type='number'
                        name='year'
                        value={formData.year}
                        onChange={handleChange}
                        placeholder='Publication Year'
                    />
                </div>

                <div className={styles.form_control}>
                    <label
                        className={styles.form_label}
                        htmlFor='language'>
                        Language:
                    </label>
                    <input
                        className={styles.form_input}
                        type='text'
                        name='language'
                        value={formData.language}
                        onChange={handleChange}
                        placeholder='Language'
                    />
                </div>

                <div className={styles.form_control}>
                    <label
                        className={styles.form_label}
                        htmlFor='pages'>
                        Number of pages:
                    </label>
                    <input
                        className={styles.form_input}
                        type='number'
                        name='pages'
                        value={formData.pages}
                        onChange={handleChange}
                        placeholder='Number of pages'
                    />
                </div>

                <div className={styles.form_control}>
                    <label
                        className={styles.form_label}
                        htmlFor='url'>
                        Book Cover URL:
                    </label>
                    <input
                        className={styles.form_input}
                        type='text'
                        name='url'
                        value={formData.url}
                        onChange={handleChange}
                        placeholder='https://example.com/cover.jpg'
                    />
                </div>

                <button
                    type='submit'
                    className={styles.book_button}>
                    Add Book
                </button>
            </form>
        </div>
    );
}

export default BookForm;
