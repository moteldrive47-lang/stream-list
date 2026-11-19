import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const newItem = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setItems((prev) => [...prev, newItem]);
    console.log('Added item:', newItem);
    setInputValue('');
  };

  const handleToggleComplete = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const handleSaveEdit = (id) => {
    const trimmed = editText.trim();
    if (!trimmed) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, text: trimmed } : item
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px' }}>
      <h1>Welcome to EZTechMovie StreamList</h1>
      <p>Add movies or shows to your list, mark them complete, edit, or delete.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter a movie or show..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ flex: 1, padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          Add
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              marginBottom: '8px',
              border: '1px solid #ccc',
              borderRadius: '6px',
            }}
          >
            {editingId === item.id ? (
              <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1, padding: '6px' }}
                />
                <button type="button" onClick={() => handleSaveEdit(item.id)} style={{ cursor: 'pointer' }}>
                  Save
                </button>
                <button type="button" onClick={() => setEditingId(null)} style={{ cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span
                  style={{
                    flex: 1,
                    textDecoration: item.completed ? 'line-through' : 'none',
                    opacity: item.completed ? 0.6 : 1,
                  }}
                >
                  {item.text}
                </span>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => handleToggleComplete(item.id)}
                    title="Complete"
                    style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    <span className="material-symbols-outlined">check_circle</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartEdit(item)}
                    title="Edit"
                    style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    title="Delete"
                    style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}