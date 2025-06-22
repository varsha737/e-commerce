import React, { useState } from 'react';

function ViewItems({ items }) {
    const [selected, setSelected] = useState(null);
    const [carouselIdx, setCarouselIdx] = useState(0);

    const handleOpen = (item) => {
        setSelected(item);
        setCarouselIdx(0);
    };
    const handleClose = () => setSelected(null);

    return (
        <div>
            <h2>Items</h2>
            <div style={{ display: 'flex', gap: '2rem' }}>
                {items.map(item => (
                    <div key={item.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: 8, cursor: 'pointer', width: 150 }} onClick={() => handleOpen(item)}>
                        <img src={item.cover} alt={item.name} style={{ width: '100%', borderRadius: 4 }} />
                        <div style={{ marginTop: 8, fontWeight: 'bold' }}>{item.name}</div>
                        <div style={{ color: '#888', fontSize: 14 }}>₹{item.price}</div>
                    </div>
                ))}
            </div>
            {selected && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={handleClose}>
                    <div style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, maxWidth: 400, position: 'relative' }} onClick={e => e.stopPropagation()}>
                        <button onClick={handleClose} style={{ position: 'absolute', top: 8, right: 8 }}>X</button>
                        <h3>{selected.name}</h3>
                        <div style={{ fontSize: 14, color: '#555' }}>{selected.type}</div>
                        <div style={{ fontWeight: 'bold', margin: '8px 0' }}>₹{selected.price}</div>
                        <div style={{ margin: '8px 0' }}>{selected.description}</div>
                        {selected.images && selected.images.length > 0 && (
                            <div style={{ textAlign: 'center' }}>
                                <img src={selected.images[carouselIdx]} alt="item" style={{ width: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 4 }} />
                                <div style={{ marginTop: 8 }}>
                                    <button onClick={() => setCarouselIdx(i => (i - 1 + selected.images.length) % selected.images.length)} disabled={selected.images.length < 2}>Prev</button>
                                    <span style={{ margin: '0 12px' }}>{carouselIdx + 1} / {selected.images.length}</span>
                                    <button onClick={() => setCarouselIdx(i => (i + 1) % selected.images.length)} disabled={selected.images.length < 2}>Next</button>
                                </div>
                            </div>
                        )}
                        <button style={{ marginTop: 16, width: '100%' }}>Enquire</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewItems; 