import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import seriesmatchesData from "../../data/seriesmatchesData.json";

function SeriesMatchesPage() {
  const { seriesId } = useParams();
  const [series, setSeries] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!seriesmatchesData?.matchDetails) return;

    const seriesMatches = [];
    let seriesInfo = null;

    seriesmatchesData.matchDetails.forEach(detail => {
      if (detail?.matchDetailsMap?.match) {
        detail.matchDetailsMap.match.forEach(match => {
          if (String(match?.matchInfo?.seriesId) === String(seriesId)) {
            // Sort matches by date for chronological display
            seriesMatches.push({
              ...match.matchInfo,
              score: match.matchScore
            });
            
            if (!seriesInfo) {
              seriesInfo = {
                id: match.matchInfo.seriesId,
                name: match.matchInfo.seriesName
              };
            }
          }
        });
      }
    });

    // Sort matches by start date
    seriesMatches.sort((a, b) => Number(a.startDate) - Number(b.startDate));
    
    setSeries(seriesInfo);
    setMatches(seriesMatches);
  }, [seriesId]);

  const formatScore = (score) => {
    if (!score) return '';
    let result = [];
    if (score.inngs1) {
      result.push(`${score.inngs1.runs}/${score.inngs1.wickets}`);
    }
    if (score.inngs2) {
      result.push(`${score.inngs2.runs}/${score.inngs2.wickets}`);
    }
    return result.join(' & ');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link to="/series" className="text-yellow-600 hover:text-yellow-800 mb-4 inline-block">
        ← Back to Series List
      </Link>
      
      <h2 className="text-2xl font-bold text-yellow-800 mb-4">Series Matches</h2>
      
      {!series ? (
        <div className="text-gray-500">No matches found for this series.</div>
      ) : (
        <div>
          <div className="mb-6 p-4 bg-white rounded shadow">
            <div className="font-semibold text-yellow-700 mb-1">{series.name}</div>
            <div className="text-gray-700 mb-2">Series ID: {series.id}</div>
          </div>
          
          <div className="space-y-4">
            {matches.map((match, idx) => (
              <div key={match.matchId} className="p-4 bg-white rounded shadow hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-yellow-700">{match.matchDesc}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(Number(match.startDate)).toLocaleDateString()} - {new Date(Number(match.endDate)).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {match.state === 'complete' ? (
                      <span className="text-green-600">{match.status}</span>
                    ) : (
                      <span className="text-yellow-600">{match.state}</span>
                    )}
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{match.team1.teamName}</div>
                    <div className="text-gray-600">
                      {match.score?.team1Score && formatScore(match.score.team1Score)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{match.team2.teamName}</div>
                    <div className="text-gray-600">
                      {match.score?.team2Score && formatScore(match.score.team2Score)}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mt-2">
                  {match.venueInfo.ground}, {match.venueInfo.city}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SeriesMatchesPage;