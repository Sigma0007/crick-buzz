import { useState, useEffect } from 'react';
import MatchCard from '../components/MatchCard';

function MatchesPage({ data }) {
  const [filter, setFilter] = useState('all');
  const [matches, setMatches] = useState([]);
  const [matchTypes, setMatchTypes] = useState([]);

  // Extract matches and organize by match type
  useEffect(() => {
    const extractedMatches = [];
    const types = new Set();
    
    if (data?.typeMatches) {
      data.typeMatches.forEach(typeMatch => {
        const matchType = typeMatch.matchType || 'Unknown';
        types.add(matchType);
        
        typeMatch.seriesMatches.forEach(seriesMatch => {
          if (seriesMatch.seriesAdWrapper?.matches) {
            seriesMatch.seriesAdWrapper.matches.forEach(match => {
              extractedMatches.push({
                ...match,
                matchType
              });
            });
          }
        });
      });
    }
    
    setMatches(extractedMatches);
    setMatchTypes(Array.from(types));
  }, [data]); 

  // Filter matches based on selected type
  const filteredMatches = filter === 'all' 
    ? matches 
    : matches.filter(match => match.matchType === filter);

  return (

    // all card in matches page 
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-5xl mx-auto">  
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Cricket Matches
          </h1>
          
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Matches
            </button>
            
            {matchTypes.map(type => (
              <button 
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === type 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {/* Match list */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredMatches.length === 0 ? (
            <div className="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-bold text-gray-700 mb-1">No matches found</h3>
              <p className="text-gray-500 text-sm">There are no matches available for the selected filter.</p>
              {filter !== 'all' && (
                <button 
                  onClick={() => setFilter('all')} 
                  className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                 All Matches
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredMatches.map((match, idx) => (
                <MatchCard key={match.matchInfo?.matchId || idx} match={match} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MatchesPage;
