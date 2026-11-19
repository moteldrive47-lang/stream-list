import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '15px 20px', background: '#1f2937', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>StreamList</Link>
      <Link to="/movies" style={{ color: '#fff', textDecoration: 'none' }}>Movies</Link>
      <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>Cart</Link>
      <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
    </nav>
  );
}