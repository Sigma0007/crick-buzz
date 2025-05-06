import { Link } from "react-router-dom";
import serieslistData from "../../data/serieslistData.json";
import seriesmatchesData from "../../data/seriesmatchesData.json";

function SeriesPage() {
  // Get series list from serieslistData and enrich with match counts
  const seriesMap = new Map();
  
  // First populate with base series info from serieslistData
  if (serieslistData?.seriesMapProto) {
    serieslistData.seriesMapProto.forEach(dateGroup => {
      dateGroup.series.forEach(series => {
        seriesMap.set(series.id, {
          ...series,
          matchCount: 0,
          format: null
        });
      });
    });
  }

  // Then enrich with match counts and format from match data
  if (seriesmatchesData?.matchDetails) {
    seriesmatchesData.matchDetails.forEach(detail => {
      if (detail?.matchDetailsMap?.match) {
        detail.matchDetailsMap.match.forEach(match => {
          const matchInfo = match.matchInfo;
          if (!matchInfo?.seriesId) return;

          const series = seriesMap.get(matchInfo.seriesId);
          if (series) {
            series.matchCount++;
            if (!series.format) {
              series.format = matchInfo.matchFormat;
            }
          }
        });
      }
    });
  }

  const seriesListArr = Array.from(seriesMap.values())
    .sort((a, b) => Number(b.startDt) - Number(a.startDt)); // Sort by start date, newest first

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Find the first series with at least one match
  const firstSeriesWithMatches = seriesListArr.find(series => series.matchCount > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-green-900">Cricket Series</h1>
          <div className="flex gap-2 bg-white rounded-lg shadow p-1">
            <Link
              to="/series"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-green-800 bg-green-100"
            >
              All Series
            </Link>
            <Link
              to={firstSeriesWithMatches ? `/series/${firstSeriesWithMatches.id}/matches` : "/matches"}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Matches
            </Link>
            <Link
              to={`/series/${seriesListArr[0].id}/news`}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              News
            </Link>
          </div>
        </div>

        {seriesListArr.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No series found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seriesListArr.map(series => (
              <div
                key={series.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link to={`/series/${series.id}`}>
                  <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-4">
                    <div className="text-lg font-semibold text-white">
                      {series.name}
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      {series.matchCount} {series.matchCount === 1 ? 'Match' : 'Matches'}
                      {series.format && ` • ${series.format}`}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(series.startDt)} - {formatDate(series.endDt)}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link
                      to={`/series/${series.id}/matches`}
                      className="text-sm text-green-600 hover:text-green-800"
                    >
                      View Matches →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SeriesPage;
