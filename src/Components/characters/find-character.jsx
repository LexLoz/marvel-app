import React, { useState, useMemo } from 'react';

export default function FindCharacter(props) {
    const [filter, setFilter] = useState('');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div className="characters__find-character">
            <input type="text" value={filter} onChange={handleFilterChange} placeholder="Find character..." />
            {/* <ItemList items={initialItems} filter={filter} /> */}
        </div>
    );
}
