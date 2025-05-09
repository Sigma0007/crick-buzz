import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import serieslistData from "../../data/serieslistData.json";
import seriesmatchesData from "../../data/seriesmatchesData.json";
import { cricketTheme, cx, getSeriesFormatColor } from "../../theme/theme.jsx";

function SeriesDetailPage() {
  const { seriesId } = useParams();
  const [series, setSeries] = useState(null);
  const [matchCount, setMatchCount] = useState(0);
  const [format, setFormat] = useState(null);
  const [latestMatch, setLatestMatch] = useState(null);
  const [loading, setLoading] = useState(true);

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
    
    // Add a small delay to show loading state for smoother transitions
    setTimeout(() => setLoading(false), 300);
  }, [seriesId]);

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={cx(
        cricketTheme.background.main,
        "min-h-screen flex items-center justify-center"
      )}>
        <div className="text-center">
          <div className={cx(
            "w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4",
            format ? getSeriesFormatColor(format).replace("from-", "border-").split(" ")[0] : "border-indigo-600"
          )}></div>
          <p className={cricketTheme.typography.body.medium}>Loading series details...</p>
        </div>
      </div>
    );
  }

  if (!series) {
    return (
      <div className={cx(cricketTheme.background.main, "min-h-screen py-8")}>
        <div className={cx(cricketTheme.layout.container, "text-center")}>
          <div className={cx(cricketTheme.components.card.root, cricketTheme.spacing.md)}>
            <h1 className={cx(cricketTheme.typography.heading[2], "mb-2")}>Series Not Found</h1>
            <p className={cx(cricketTheme.typography.body.medium, "mb-4")}>The series you're looking for doesn't exist or has been removed.</p>
            <Link to="/series" className={cricketTheme.components.button.primary}>
              ← Back to Series List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get color based on format
  const seriesColor = getSeriesFormatColor(format);
  const formatLabel = format ? format.toUpperCase() : "SERIES";
  
  // Determine icon color based on format
  const getIconColor = () => {
    if (!format) return "text-indigo-600";
    
    const formatLower = format.toLowerCase();
    if (formatLower.includes('test')) return "text-red-600";
    if (formatLower.includes('odi')) return "text-blue-600";
    if (formatLower.includes('t20')) return "text-purple-600";
    if (formatLower.includes('women')) return "text-pink-600";
    if (formatLower.includes('league')) return "text-amber-600";
    return "text-teal-600";
  };
  
  const iconColor = getIconColor();

  return (
    <div className={cx(cricketTheme.background.main, "min-h-screen py-8")}>
      <div className={cricketTheme.layout.container}>
        <Link to="/series" className={cx(
          cricketTheme.components.button.text,
          "mb-4 inline-flex items-center"
        )}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Series List
        </Link>

        {/* Series Header Card */}
        <div className={cx(
          "bg-gradient-to-r rounded-xl overflow-hidden mb-6 shadow-lg",
          "text-white",
          seriesColor
        )}>
          <div className="p-6 backdrop-blur-sm bg-black/10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={cx(
                "bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold tracking-wider"
              )}>
                {formatLabel}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{series.name}</h1>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className={cx(
                "bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium"
              )}>
                {matchCount} {matchCount === 1 ? 'Match' : 'Matches'}
              </span>
              <span className={cx(
                "bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium"
              )}>
                {formatDate(series.startDt)} - {formatDate(series.endDt)}
              </span>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-4 flex flex-wrap gap-4 justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Start: {formatDate(series.startDt)}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>End: {formatDate(series.endDt)}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Series ID: {series.id}</span>
            </div>
          </div>
        </div>

        {/* Series Navigation */}
        <div className={cx(
          cricketTheme.components.card.root,
          cricketTheme.components.card.body,
          "mb-6"
        )}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to={`/series/${seriesId}/matches`} className={cx(
              cricketTheme.components.card.root,
              cricketTheme.components.card.hover,
              "p-4 flex flex-col items-center text-center group"
            )}>
              <div className={cx(
                "w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110",
                `bg-gradient-to-br ${seriesColor}`
              )}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className={cx(cricketTheme.typography.heading[5])}>Matches</h3>
              <p className={cx(cricketTheme.typography.body.small)}>View all matches in this series</p>
            </Link>
            
            <Link to={`/series/${seriesId}/points-table`} className={cx(
              cricketTheme.components.card.root,
              cricketTheme.components.card.hover,
              "p-4 flex flex-col items-center text-center group"
            )}>
              <div className={cx(
                "w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110",
                `bg-gradient-to-br ${seriesColor}`
              )}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={cx(cricketTheme.typography.heading[5])}>Points Table</h3>
              <p className={cx(cricketTheme.typography.body.small)}>View series standings</p>
            </Link>
            
            <Link to={`/series/${seriesId}/news`} className={cx(
              cricketTheme.components.card.root,
              cricketTheme.components.card.hover,
              "p-4 flex flex-col items-center text-center group"
            )}>
              <div className={cx(
                "w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110",
                `bg-gradient-to-br ${seriesColor}`
              )}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className={cx(cricketTheme.typography.heading[5])}>News</h3>
              <p className={cx(cricketTheme.typography.body.small)}>Latest news and updates</p>
            </Link>
            
            <Link to={`/series/${seriesId}/stats`} className={cx(
              cricketTheme.components.card.root,
              cricketTheme.components.card.hover,
              "p-4 flex flex-col items-center text-center group"
            )}>
              <div className={cx(
                "w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110",
                `bg-gradient-to-br ${seriesColor}`
              )}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className={cx(cricketTheme.typography.heading[5])}>Statistics</h3>
              <p className={cx(cricketTheme.typography.body.small)}>Player and team statistics</p>
            </Link>
          </div>
        </div>

        {/* Latest Match */}
        {latestMatch && (
          <div className={cx(
            cricketTheme.components.card.root,
            "mb-6 overflow-hidden"
          )}>
            <div className={cx(
              "p-4 border-b",
              `bg-gradient-to-r ${seriesColor} text-white`
            )}>
              <h2 className="text-xl font-bold">Latest Match</h2>
            </div>
            <div className="p-5">
              <div className={cx(
                cricketTheme.components.card.root,
                "p-4 border"
              )}>
                <div className="flex justify-between items-center mb-3">
                  <div className={cx(cricketTheme.typography.heading[5])}>
                    {latestMatch.matchInfo.matchDesc}
                  </div>
                  <div className={cx(
                    latestMatch.matchInfo.status.includes('Live') 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : cricketTheme.components.badge.info,
                    "px-3 py-1 rounded-full text-xs font-medium"
                  )}>
                    {latestMatch.matchInfo.status}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={cx(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white",
                        `bg-gradient-to-br ${seriesColor}`
                      )}>
                        {latestMatch.matchInfo.team1.teamSName}
                      </div>
                      <div className="font-medium">{latestMatch.matchInfo.team1.teamName}</div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={cx(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white",
                        `bg-gradient-to-br ${seriesColor}`
                      )}>
                        {latestMatch.matchInfo.team2.teamSName}
                      </div>
                      <div className="font-medium">{latestMatch.matchInfo.team2.teamName}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <Link 
                      to={`/match/${latestMatch.matchInfo.matchId}`} 
                      className={cx(
                        "flex items-center justify-center gap-2 font-medium py-2 px-4 rounded-lg transition-colors",
                        `bg-gradient-to-r ${seriesColor} text-white hover:shadow-md`
                      )}
                    >
                      View Match Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeriesDetailPage;