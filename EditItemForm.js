import React, { useState, useEffect } from 'react';

const EditItemForm = ({ itemId }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchItem();
    }, []);

    const fetchItem = async () => {
        try {
            const response = await fetch(`http://localhost:5000/items/${itemId}`);
            const data = await response.json();
            setName(data.name);
            setDescription(data.description);
        } catch (error) {
            console.error('Error fetching item:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/items/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description }),
            });
            const data = await response.json();
            console.log('Item updated:', data);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div>
            <h2>Edit Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Item</button>
            </form>
        </div>
    );
};

export default EditItemForm;
