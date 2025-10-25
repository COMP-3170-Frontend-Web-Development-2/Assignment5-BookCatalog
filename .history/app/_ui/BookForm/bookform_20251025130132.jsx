import { useState } from "react";

function BookForm({ onAddBook }) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        publisher: "",
        year: "",
        language: "",
        pages: "",
        url: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddBook({ ...formData, onReset: resetForm });
    }

    // ✅ Função que limpa o formulário
    function resetForm() {
        setFormData({
            title: "",
            author: "",
            publisher: "",
            year: "",
            language: "",
            pages: "",
            url: "",
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='Title'
            />
            <input
                type='text'
                name='author'
                value={formData.author}
                onChange={handleChange}
                placeholder='Author'
            />
            <input
                type='text'
                name='publisher'
                value={formData.publisher}
                onChange={handleChange}
                placeholder='Publisher'
            />
            <input
                type='number'
                name='year'
                value={formData.year}
                onChange={handleChange}
                placeholder='Year'
            />
            <input
                type='text'
                name='language'
                value={formData.language}
                onChange={handleChange}
                placeholder='Language'
            />
            <input
                type='number'
                name='pages'
                value={formData.pages}
                onChange={handleChange}
                placeholder='Pages'
            />
            <input
                type='text'
                name='url'
                value={formData.url}
                onChange={handleChange}
                placeholder='Image URL (optional)'
            />
            <button type='submit'>Add Book</button>
        </form>
    );
}

export default BookForm;
