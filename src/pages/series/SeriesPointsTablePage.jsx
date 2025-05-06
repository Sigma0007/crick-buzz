import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import seriespointtabseData from "../../data/seriespointtabseData.json";
import seriesmatchesData from "../../data/seriesmatchesData.json";

function SeriesPointsTablePage() {
  const { seriesId } = useParams();
  const [series, setSeries] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Get series info from matches data
    if (seriesmatchesData?.matchDetails) {
      for (const detail of seriesmatchesData.matchDetails) {
        if (detail?.matchDetailsMap?.match) {
          const match = detail.matchDetailsMap.match.find(
            m => String(m.matchInfo?.seriesId) === String(seriesId)
          );
          if (match) {
            setSeries({
              id: match.matchInfo.seriesId,
              name: match.matchInfo.seriesName
            });
            break;
          }
        }
      }
    }

    // Get players data
    if (seriespointtabseData?.player) {
      setPlayers(seriespointtabseData.player);
    }
  }, [seriesId]);

  const getImageUrl = (imageId) => {
    return `https://www.cricbuzz.com/a/img/v1/75x75/i1/c${imageId}/player.jpg`;
  };

  const renderPlayerCard = (player) => {
    if (player.isHeader) {
      return (
        <div key={player.name} className="col-span-full">
          <h3 className="text-lg font-semibold text-blue-800 mt-6 mb-3 border-b border-blue-100 pb-2">
            {player.name}
          </h3>
        </div>
      );
    }

    return (
      <div
        key={player.id}
        className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow flex items-start space-x-4"
      >
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
            <img
              src={getImageUrl(player.imageId)}
              alt={player.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/player-fallback.jpg';
              }}
            />
          </div>
        </div>
        <div className="flex-grow">
          <div className="font-medium text-blue-900">
            {player.name}
            {player.captain && (
              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                Captain
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 mt-1">{player.role}</div>
          <div className="text-xs text-gray-500 mt-2 space-y-0.5">
            {player.battingStyle && (
              <div>Batting: {player.battingStyle}</div>
            )}
            {player.bowlingStyle && (
              <div>Bowling: {player.bowlingStyle}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link to="/series" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Back to Series List
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Squad</h1>
        {series && (
          <Link
            to={`/series/${series.id}/matches`}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            View Matches →
          </Link>
        )}
      </div>

      {!series ? (
        <div className="text-gray-500">Loading series information...</div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-white rounded shadow">
            <div className="font-semibold text-blue-700 text-xl mb-1">
              {series.name}
            </div>
          </div>

          {players.length === 0 ? (
            <div className="text-gray-500">No players found for this series.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {players.map(player => renderPlayerCard(player))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SeriesPointsTablePage;