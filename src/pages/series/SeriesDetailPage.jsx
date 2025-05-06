import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import serieslistData from "../../data/serieslistData.json";
import seriesmatchesData from "../../data/seriesmatchesData.json";

function SeriesDetailPage() {
  const { seriesId } = useParams();
  const [series, setSeries] = useState(null);
  const [matchCount, setMatchCount] = useState(0);
  const [format, setFormat] = useState(null);
  const [latestMatch, setLatestMatch] = useState(null);

  useEffect(() => {
    // Find series in serieslistData
    if (serieslistData?.seriesMapProto) {
      for (const dateGroup of serieslistData.seriesMapProto) {
        const foundSeries = dateGroup.series.find(s => String(s.id) === String(seriesId));
        if (foundSeries) {
          setSeries(foundSeries);
          break;
        }
      }
    }

    // Get additional info from matches data
    if (seriesmatchesData?.matchDetails) {
      let count = 0;
      let lastMatch = null;
      let matchFormat = null;

      seriesmatchesData.matchDetails.forEach(detail => {
        if (detail?.matchDetailsMap?.match) {
          detail.matchDetailsMap.match.forEach(match => {
            if (String(match?.matchInfo?.seriesId) === String(seriesId)) {
              count++;
              if (!matchFormat) {
                matchFormat = match.matchInfo.matchFormat;
              }
              if (!lastMatch || Number(match.matchInfo.startDate) > Number(lastMatch.matchInfo.startDate)) {
                lastMatch = match;
              }
            }
          });
        }
      });

      setMatchCount(count);
      setFormat(matchFormat);
      setLatestMatch(lastMatch);
    }
  }, [seriesId]);

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!series) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Series Not Found</h1>
            <p className="text-gray-600 mb-4">The series you're looking for doesn't exist or has been removed.</p>
            <Link to="/series" className="text-blue-600 hover:text-blue-800">
              ← Back to Series List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/series" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Back to Series List
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">{series.name}</h1>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Series Duration</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {formatDate(series.startDt)} - {formatDate(series.endDt)}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Format</h3>
                  <p className="mt-1 text-lg text-gray-900">{format || 'Multiple Formats'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Matches</h3>
                  <p className="mt-1 text-lg text-gray-900">{matchCount}</p>
                </div>

                {latestMatch && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Latest Match</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {latestMatch.matchInfo.team1.teamName} vs {latestMatch.matchInfo.team2.teamName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(latestMatch.matchInfo.startDate)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to={`/series/${seriesId}/matches`}
              className="flex items-center justify-center px-4 py-3 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <div className="text-center">
                <div className="text-yellow-800 font-semibold">Matches</div>
                <div className="text-sm text-yellow-600">{matchCount} total</div>
              </div>
            </Link>
            
            <Link
              to={`/series/${seriesId}/news`}
              className="flex items-center justify-center px-4 py-3 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
            >
              <div className="text-center">
                <div className="text-green-800 font-semibold">News</div>
                <div className="text-sm text-green-600">Latest updates</div>
              </div>
            </Link>
            
            <Link
              to={`/series/${seriesId}/points-table`}
              className="flex items-center justify-center px-4 py-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <div className="text-center">
                <div className="text-blue-800 font-semibold">Players</div>
                <div className="text-sm text-blue-600">Squad details</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeriesDetailPage;