import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ViewItems from './pages/ViewItems';
import AddItem from './pages/AddItem';

const initialItems = [
  // Removed Blue Shirt and Running Shoes
];

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('items');
    return saved ? JSON.parse(saved) : initialItems;
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  return (
    <Router>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">View Items</Link>
        <Link to="/add">Add Item</Link>
      </nav>
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<ViewItems items={items} />} />
          <Route path="/add" element={<AddItem setItems={setItems} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 