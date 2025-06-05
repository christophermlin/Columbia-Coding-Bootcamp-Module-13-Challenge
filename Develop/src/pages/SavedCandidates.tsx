import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const LOCAL_STORAGE_KEY = 'savedCandidates';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'username'>('name');
  const [filter, setFilter] = useState<string>('');
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const loaded: Candidate[] = saved ? JSON.parse(saved) : [];
    setCandidates(loaded);
  }, []);

  useEffect(() => {
    let filtered = candidates;
    if (filter.trim()) {
      filtered = filtered.filter(c =>
        (c.name && c.name.toLowerCase().includes(filter.toLowerCase())) ||
        c.login.toLowerCase().includes(filter.toLowerCase())
      );
    }
    if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else {
      filtered = [...filtered].sort((a, b) => a.login.localeCompare(b.login));
    }
    setFilteredCandidates(filtered);
  }, [candidates, filter, sortBy]);

  if (!candidates.length) {
    return (
      <section style={{ textAlign: 'center', color: '#fff', marginTop: 40 }}>
        <h2>No candidates have been accepted.</h2>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', color: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Potential Candidates</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Filter by name or username"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #61dafb', minWidth: 200 }}
        />
        <select value={sortBy} onChange={e => setSortBy(e.target.value as 'name' | 'username')} style={{ padding: 8, borderRadius: 6, border: '1px solid #61dafb' }}>
          <option value="name">Sort by Name</option>
          <option value="username">Sort by Username</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
        {filteredCandidates.map((candidate) => (
          <div key={candidate.login} style={{ background: '#222', borderRadius: 12, padding: 24, minWidth: 260, maxWidth: 320, boxShadow: '0 2px 12px #0006', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={candidate.avatar_url} alt={candidate.login} style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 12, border: '2px solid #61dafb' }} />
            <h2 style={{ margin: 0 }}>{candidate.name || 'No Name Provided'}</h2>
            <p style={{ margin: '4px 0' }}><strong>Username:</strong> {candidate.login}</p>
            <p style={{ margin: '4px 0' }}><strong>Location:</strong> {candidate.location || 'N/A'}</p>
            <p style={{ margin: '4px 0' }}><strong>Email:</strong> {candidate.email || 'N/A'}</p>
            <p style={{ margin: '4px 0' }}><strong>Company:</strong> {candidate.company || 'N/A'}</p>
            <p style={{ margin: '4px 0' }}><a href={candidate.html_url} target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb' }}>GitHub Profile</a></p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavedCandidates;
