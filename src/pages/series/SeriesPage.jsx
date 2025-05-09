import { Link } from "react-router-dom";
import serieslistData from "../../data/serieslistData.json";
import seriesmatchesData from "../../data/seriesmatchesData.json";
import { useState } from "react";
import { cricketTheme, cx, getSeriesFormatColor } from "../../theme/theme.jsx";

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

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Find the first series with at least one match
  const firstSeriesWithMatches = seriesListArr.find(series => series.matchCount > 0);
  
  // Filter series based on active filter
  const filteredSeries = activeFilter === "all" 
    ? seriesListArr 
    : seriesListArr.filter(series => series.format?.toLowerCase() === activeFilter);

  // Get unique formats for filter
  const formats = [...new Set(seriesListArr.map(series => series.format).filter(Boolean))];

  return (
    <div className={cx(cricketTheme.background.main, "min-h-screen py-8")}>
      <div className={cx(cricketTheme.layout.container)}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className={cx(cricketTheme.typography.heading[1], "flex items-center")}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Cricket Series
          </h1>
          <div className={cx(
            cricketTheme.components.card.glass,
            "p-1 flex gap-2 rounded-lg"
          )}>
            <button
              onClick={() => setActiveFilter("all")}
              className={cx(
                activeFilter === "all" 
                  ? cricketTheme.components.button.primary 
                  : cricketTheme.components.button.outline,
                "text-sm"
              )}
            >
              All
            </button>
            {formats.map(format => (
              <button
                key={format}
                onClick={() => setActiveFilter(format.toLowerCase())}
                className={cx(
                  activeFilter === format.toLowerCase() 
                    ? cricketTheme.components.button.primary 
                    : cricketTheme.components.button.outline,
                  "text-sm"
                )}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Series */}
        {firstSeriesWithMatches && (
          <div className={cx(
            "bg-gradient-to-r rounded-xl overflow-hidden mb-8 shadow-lg",
            "text-white",
            getSeriesFormatColor(firstSeriesWithMatches.format)
          )}>
            <div className="p-6 backdrop-blur-sm bg-black/10">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <div className={cx(cricketTheme.components.badge.accent, "mb-2")}>Featured Series</div>
                  <h2 className="text-2xl font-bold mb-2">{firstSeriesWithMatches.name}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {firstSeriesWithMatches.format && (
                      <span className={cx(
                        "bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium"
                      )}>
                        {firstSeriesWithMatches.format}
                      </span>
                    )}
                    <span className={cx(
                      "bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium"
                    )}>
                      {firstSeriesWithMatches.matchCount} {firstSeriesWithMatches.matchCount === 1 ? 'Match' : 'Matches'}
                    </span>
                  </div>
                  <div className="text-white/80 mb-4">
                    {formatDate(firstSeriesWithMatches.startDt)} - {formatDate(firstSeriesWithMatches.endDt)}
                  </div>
                </div>
                <div className="flex items-end">
                  <Link 
                    to={`/series/${firstSeriesWithMatches.id}`}
                    className={cx(
                      cricketTheme.components.button.accent,
                      "flex items-center shadow-md"
                    )}
                  >
                    View Series
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Series List */}
        <div className={cricketTheme.layout.grid[3]}>
          {filteredSeries.length > 0 ? (
            filteredSeries.map(series => (
              <Link 
                key={series.id} 
                to={`/series/${series.id}`}
                className={cx(
                  cricketTheme.components.card.root,
                  cricketTheme.components.card.hover,
                  "overflow-hidden"
                )}
              >
                <div className={cx(
                  "bg-gradient-to-r p-3",
                  "text-white",
                  getSeriesFormatColor(series.format)
                )}>
                  <h3 className="font-bold truncate">{series.name}</h3>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm text-slate-500">
                      {formatDate(series.startDt)} - {formatDate(series.endDt)}
                    </div>
                    {series.format && (
                      <span className={cx(cricketTheme.components.badge.primary)}>
                        {series.format}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={cx(
                      series.matchCount > 0 
                        ? cricketTheme.components.badge.success 
                        : cricketTheme.components.badge.warning
                    )}>
                      {series.matchCount} {series.matchCount === 1 ? 'Match' : 'Matches'}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className={cx(
              cricketTheme.components.card.root,
              cricketTheme.components.card.body,
              "col-span-full text-center"
            )}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className={cx(cricketTheme.typography.heading[3], "mb-2")}>No Series Found</h3>
              <p className={cx(cricketTheme.typography.body.medium)}>
                No series matching the selected filter were found.
              </p>
              {activeFilter !== "all" && (
                <button 
                  onClick={() => setActiveFilter("all")}
                  className={cx(cricketTheme.components.button.primary, "mt-4")}
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
