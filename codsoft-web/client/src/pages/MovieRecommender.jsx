import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/Card';
import { Search, Loader2, Info, Star, Film, Tag, Calendar } from 'lucide-react';

/* ─── Project Label ─── */
const ProjectLabel = ({ text }) => (
  <p style={{
    textAlign: 'center',
    fontSize: '0.75rem',
    color: 'var(--muted)',
    marginTop: '2rem',
    letterSpacing: '0.02em'
  }}>
    {text}
  </p>
);

/* ─── Movie Insights Panel ─── */
const MovieInsightsPanel = ({ movie }) => {
  if (!movie) return null;
  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      padding: '1.25rem 1.5rem',
      marginBottom: '1.25rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.75rem 1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.25rem' }}>
        <Film size={18} color="var(--accent)" />
        <span style={{ fontWeight: 700, fontSize: '1.0625rem' }}>{movie.title}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Tag size={14} color="var(--muted)" />
        <span style={{ fontSize: '0.8125rem', color: 'var(--muted)', fontWeight: 500 }}>Genre</span>
      </div>
      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)' }}>{movie.genre}</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Calendar size={14} color="var(--muted)" />
        <span style={{ fontSize: '0.8125rem', color: 'var(--muted)', fontWeight: 500 }}>Release Year</span>
      </div>
      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{movie.year}</span>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', gridColumn: '1 / -1', marginTop: '0.25rem' }}>
        <Star size={14} color="var(--muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <span style={{ fontSize: '0.8125rem', color: 'var(--muted)', fontWeight: 500, flexShrink: 0 }}>Keywords</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginLeft: '4px' }}>
          {movie.keywords?.map((kw, i) => (
            <span key={kw + i} style={{
              padding: '2px 10px',
              borderRadius: '20px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              fontSize: '0.75rem',
              color: 'var(--text)',
              fontWeight: 500
            }}>{kw}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Recommendation Card ─── */
const RecommendationCard = ({ movie }) => {
  const score = movie.similarity ?? 0;
  const barColor = score >= 70 ? '#22c55e' : score >= 45 ? 'var(--accent)' : '#f59e0b';

  return (
    <div style={{
      padding: '1.25rem',
      backgroundColor: 'white',
      borderRadius: '14px',
      border: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
      transition: 'transform 0.15s, box-shadow 0.15s'
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.03)'; }}
    >
      {/* Title row */}
      <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{movie.title}</div>

      {/* Genre + Year */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 600 }}>{movie.genre}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{movie.year}</span>
      </div>

      {/* Similarity Score bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '0.6875rem', color: 'var(--muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Similarity
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: barColor }}>{score}%</span>
        </div>
        <div style={{ height: '5px', borderRadius: '10px', backgroundColor: 'var(--surface)', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${score}%`,
            backgroundColor: barColor,
            borderRadius: '10px',
            transition: 'width 0.6s ease'
          }} />
        </div>
      </div>

      {/* Keywords */}
      <div style={{ fontSize: '0.6875rem', color: 'var(--muted)', marginTop: '2px' }}>
        {movie.keywords?.join(' · ')}
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
const MovieRecommender = () => {
  const [title, setTitle] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchingSuggestions, setSearchingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);

  // Debounced suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title.length >= 2) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [title]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async () => {
    setSearchingSuggestions(true);
    try {
      const response = await fetch(`/api/recommend/suggestions?q=${title}`);
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(data.length > 0);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setSearchingSuggestions(false);
    }
  };

  const handleRecommend = async (overrideTitle) => {
    const searchTitle = overrideTitle || title;
    if (!searchTitle.trim()) return;
    setLoading(true);
    setShowSuggestions(false);
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: searchTitle }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <strong key={part + i} style={{ color: 'var(--accent)' }}>{part}</strong>
        : part
    );
  };

  return (
    <Card
      title="Movie Recommender"
      subtitle="Find your next favorite film with our smart AI engine"
      maxWidth="820px"
    >
      {/* ── 1. SEARCH BAR ── */}
      <div style={{ position: 'relative' }} ref={suggestionRef}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              placeholder="Enter a movie you liked (e.g. Inception)..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRecommend()}
              style={{
                width: '100%',
                padding: '12px 16px 12px 40px',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: 'white',
                boxSizing: 'border-box'
              }}
            />
            <Search
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              size={20} color="var(--muted)"
            />
            {searchingSuggestions && (
              <Loader2
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
                size={18} className="animate-spin" color="var(--accent)"
              />
            )}
          </div>
          <button
            onClick={() => handleRecommend()}
            disabled={loading}
            style={{
              padding: '0 24px',
              backgroundColor: 'var(--accent)',
              color: 'white',
              borderRadius: '12px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: loading ? 0.7 : 1,
              whiteSpace: 'nowrap'
            }}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Search'}
          </button>
        </div>

        {/* Suggestion Dropdown */}
        {showSuggestions && !loading && (
          <div style={{
            position: 'absolute',
            top: '54px',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            zIndex: 100,
            overflow: 'hidden'
          }}>
            {suggestions.map((s, i) => (
              <div
                key={s + i}
                onClick={() => { setTitle(s); handleRecommend(s); }}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  fontSize: '0.9375rem',
                  borderBottom: i === suggestions.length - 1 ? 'none' : '1px solid var(--surface)',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {highlightMatch(s, title)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Loading state ── */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '3rem' }}>
          <Loader2 size={40} color="var(--accent)" className="animate-spin" />
          <p style={{ color: 'var(--muted)', fontWeight: 500 }}>Finding similar movies...</p>
        </div>
      )}

      {/* ── Results ── */}
      {results && !loading && (
        <div style={{ marginTop: '1.5rem' }}>

          {/* ── Did-you-mean / correction banner ── */}
          {results?.correctedTitle && results?.didYouMean && (
            <div style={{
              display: 'flex',
              gap: '12px',
              padding: '0.875rem 1rem',
              backgroundColor: 'rgba(34, 197, 94, 0.05)',
              borderRadius: '12px',
              color: 'var(--text)',
              fontSize: '0.9375rem',
              marginBottom: '1.25rem',
              alignItems: 'center',
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}>
              <Info size={20} color="var(--accent)" />
              <div>
                Showing results for <strong>{results.correctedTitle}</strong>
                <span style={{ color: 'var(--muted)', marginLeft: '8px', fontSize: '0.8125rem' }}>
                  (Confidence: {Math.round((results.confidenceScore || 0) * 100)}%)
                </span>
              </div>
            </div>
          )}

          {/* ── Did-you-mean pill suggestions ── */}
          {!results?.correctedTitle && (results?.suggestions?.length ?? 0) > 0 && (
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--surface)',
              borderRadius: '12px',
              color: 'var(--text)',
              fontSize: '0.9375rem',
              marginBottom: '1.25rem',
              border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', fontWeight: 600 }}>
                <Info size={18} color="var(--muted)" />
                Did you mean?
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {results.suggestions.map((s, i) => (
                  <button
                    key={s + i}
                    onClick={() => { setTitle(s); handleRecommend(s); }}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'white',
                      fontSize: '0.8125rem',
                      color: 'var(--accent)',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    {highlightMatch(s, title)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(results?.recommendations?.length ?? 0) > 0 ? (
            <>
              {/* ── 2. MOVIE INSIGHTS PANEL ── */}
              {results.selectedMovie && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                    <Film size={14} color="var(--muted)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Selected Movie
                    </span>
                  </div>
                  <MovieInsightsPanel movie={results.selectedMovie} />
                </div>
              )}

              {/* ── 3. RECOMMENDATION EXPLANATION ── */}
              {results.explanation && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '0.875rem 1.125rem',
                  backgroundColor: 'rgba(99, 102, 241, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  marginBottom: '1.25rem'
                }}>
                  <Star size={16} color="var(--accent)" fill="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>
                    {results.explanation}
                  </p>
                </div>
              )}

              {/* ── 4. RECOMMENDATION CARDS ── */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '1rem'
              }}>
                {results.recommendations.map((movie, i) => (
                  <RecommendationCard key={movie.title + i} movie={movie} />
                ))}
              </div>
            </>
          ) : !results?.correctedTitle && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
              No specific recommendations found for "{title}". Try one of the suggestions above!
            </div>
          )}
        </div>
      )}

      {/* ── Project Label ── */}
      <ProjectLabel text="Movie Recommendation Engine — CodSoft Internship Project" />
    </Card>
  );
};

export default MovieRecommender;
