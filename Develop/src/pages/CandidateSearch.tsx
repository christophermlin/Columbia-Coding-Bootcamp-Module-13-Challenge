import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const LOCAL_STORAGE_KEY = 'savedCandidates';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [noMoreCandidates, setNoMoreCandidates] = useState<boolean>(false);

  // Fetch a random candidate from GitHub
  const fetchCandidate = async () => {
    setLoading(true);
    setError(null);
    setCandidate(null);
    try {
      const users = await searchGithub();
      if (!users || users.length === 0) {
        setNoMoreCandidates(true);
        setLoading(false);
        return;
      }
      // Pick the first user and fetch full details
      const user = users[0];
      const userDetails = await searchGithubUser(user.login);
      setCandidate(userDetails);
    } catch (err) {
      setError('Failed to fetch candidate.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  // Save candidate to localStorage
  const saveCandidate = (candidate: Candidate) => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    let savedCandidates: Candidate[] = saved ? JSON.parse(saved) : [];
    // Prevent duplicates
    if (!savedCandidates.some((c) => c.login === candidate.login)) {
      savedCandidates.push(candidate);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedCandidates));
    }
  };

  // Accept candidate
  const handleAccept = () => {
    if (candidate) {
      saveCandidate(candidate);
      fetchCandidate();
    }
  };

  // Reject candidate
  const handleReject = () => {
    fetchCandidate();
  };

  if (loading) return <div style={{textAlign: 'center'}}><h2>Loading...</h2></div>;
  if (error) return <div style={{color: 'red', textAlign: 'center'}}>{error}</div>;
  if (noMoreCandidates || !candidate) return <div style={{textAlign: 'center'}}><h2>No more candidates available.</h2></div>;

  return (
    <section style={{ maxWidth: 400, margin: '0 auto', background: '#222', borderRadius: 12, padding: 24, color: '#fff', boxShadow: '0 2px 12px #0006' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={candidate.avatar_url} alt={candidate.login} style={{ width: 120, height: 120, borderRadius: '50%', marginBottom: 16, border: '3px solid #61dafb' }} />
        <h2>{candidate.name || 'No Name Provided'}</h2>
        <p><strong>Username:</strong> {candidate.login}</p>
        <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
        <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
        <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
        <p><a href={candidate.html_url} target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb' }}>GitHub Profile</a></p>
        <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
          <button onClick={handleAccept} style={{ background: '#61dafb', color: '#222', fontWeight: 'bold', fontSize: 24, width: 48, height: 48, borderRadius: '50%' }}>+</button>
          <button onClick={handleReject} style={{ background: '#ff4b4b', color: '#fff', fontWeight: 'bold', fontSize: 24, width: 48, height: 48, borderRadius: '50%' }}>-</button>
        </div>
      </div>
    </section>
  );
};

export default CandidateSearch;
