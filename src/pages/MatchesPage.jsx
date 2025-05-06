import MatchCard from '../components/MatchCard';

function MatchesPage({ data }) {
  // Extract matches from the API structure
  const matches = [];
  if (data?.typeMatches) {
    data.typeMatches.forEach(typeMatch => {
      typeMatch.seriesMatches.forEach(seriesMatch => {
        if (seriesMatch.seriesAdWrapper?.matches) {
          matches.push(...seriesMatch.seriesAdWrapper.matches);
        }
      });
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 drop-shadow-lg">Cricket Matches</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {matches.length === 0 && (
          <div className="text-lg text-gray-500">No matches found.</div>
        )}
        {matches.map((match, idx) => (
          <MatchCard key={match.matchInfo?.matchId || idx} match={match} />
        ))}
      </div>
    </div>
  );
}

export default MatchesPage;
