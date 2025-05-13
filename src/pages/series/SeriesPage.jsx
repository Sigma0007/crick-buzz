import { Link } from "react-router-dom";
import serieslistData from "../../data/serieslistData.json";
import seriesmatchesData from "../../data/seriesmatchesData.json";
import { useState } from "react";
// import { cricketTheme, cx } from "../../theme/theme.jsx";

function SeriesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  
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
``
  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  // Filter series based on active filter
  const filteredSeries = activeFilter === "all" 
    ? seriesListArr 
    : seriesListArr.filter(series => series.format?.toLowerCase() === activeFilter);

  // Get unique formats for filter
  const formats = [...new Set(seriesListArr.map(series => series.format).filter(Boolean))];

  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-purple-900 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Cricket Series
          </h1>
          <div className="bg-white rounded-full shadow-sm p-1 flex">
            {formats.map(format => (
              <button
                key={format}
                onClick={() => setActiveFilter(format.toLowerCase())}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === format.toLowerCase() 
                    ? "bg-purple-600 text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        {/* Series List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeries.length > 0 ? (
            filteredSeries.map(series => (
              <Link 
                key={series.id} 
                to={`/series/${series.id}`}
                className="bg-white rounded-xl overflow-hidden"
              >
                <div className="bg-teal-600 p-4 text-white">
                  <h3 className="font-bold truncate">{series.name}</h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {formatDate(series.startDt)} - {formatDate(series.endDt)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                      {series.matchCount} {series.matchCount === 1 ? 'Match' : 'Matches'}
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-100 text-purple-700 hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center p-8 bg-white rounded-xl shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-purple-800 mb-2">No Series Found</h3>
              <p className="text-base text-slate-700 mb-4">
                No series matching the selected filter were found.
              </p>
              {activeFilter !== "all" && (
                <button 
                  onClick={() => setActiveFilter("all")}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4"
                >
                  Show All Series
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SeriesPage;
