import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav style={{ padding: '1rem', background: '#222', color: '#fff', marginBottom: '2rem' }}>
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0, justifyContent: 'center' }}>
        <li>
          <NavLink to="/" end style={({ isActive }) => ({ color: isActive ? '#61dafb' : '#fff', fontWeight: isActive ? 'bold' : 'normal', textDecoration: 'none' })}>
            Candidate Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/SavedCandidates" style={({ isActive }) => ({ color: isActive ? '#61dafb' : '#fff', fontWeight: isActive ? 'bold' : 'normal', textDecoration: 'none' })}>
            Saved Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
