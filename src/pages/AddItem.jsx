import React, { useState } from 'react';

const itemTypes = ['Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Other'];

function AddItem({ setItems }) {
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({
        name: '',
        type: '',
        description: '',
        price: '',
        cover: null,
        images: [],
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleCover = e => {
        setForm(f => ({ ...f, cover: e.target.files[0] }));
    };

    const handleImages = e => {
        setForm(f => ({ ...f, images: Array.from(e.target.files) }));
    };

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        let coverUrl = form.cover ? await fileToBase64(form.cover) : '';
        let imagesUrl = form.images.length > 0 ? await Promise.all(form.images.map(fileToBase64)) : [];
        setItems(items => [
            ...items,
            {
                id: Date.now(),
                name: form.name,
                type: form.type,
                description: form.description,
                price: form.price,
                cover: coverUrl,
                images: imagesUrl,
            },
        ]);
        setSuccess(true);
        setForm({ name: '', type: '', description: '', price: '', cover: null, images: [] });
        setTimeout(() => setSuccess(false), 2000);
    };

    return (
        <div className="add-item-card">
            <h2>Add Item</h2>
            {success && <div style={{ color: 'green', marginBottom: 10 }}>Item successfully added</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 400 }}>
                <input name="name" placeholder="Item Name" value={form.name} onChange={handleChange} required />
                <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
                <select name="type" value={form.type} onChange={handleChange} required>
                    <option value="">Select Type</option>
                    {itemTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                <label>Cover Image: <input type="file" accept="image/*" onChange={handleCover} required /></label>
                <label>Additional Images: <input type="file" accept="image/*" multiple onChange={handleImages} /></label>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}

export default AddItem; 