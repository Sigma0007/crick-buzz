import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import seriesmatchesData from "../../data/seriesmatchesData.json";
import { cricketTheme, cx } from "../../theme/theme.jsx";

function SeriesMatchesPage() {
  const { seriesId } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [matchTypes, setMatchTypes] = useState([]);
  const [seriesInfo, setSeriesInfo] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (!seriesmatchesData?.matchDetails) {
      setLoading(false);
      return;
    }

    const allMatches = [];
    const uniqueMatchTypes = new Set();
    let seriesDetails = null;

    // Process all matches from the data
    seriesmatchesData.matchDetails.forEach(detail => {
      if (detail?.matchDetailsMap?.match) {
        detail.matchDetailsMap.match.forEach(match => {
          if (match?.matchInfo) {
            // Add match to our collection
            allMatches.push({
              ...match.matchInfo,
              score: match.matchScore,
              dateGroup: detail.matchDetailsMap.key
            });
            
            // Track unique match types for filtering
            if (match.matchInfo.matchDesc) {
              uniqueMatchTypes.add(match.matchInfo.matchDesc.split(' ')[0]);
            }
            
            // Get series info from the first match
            if (!seriesDetails && match.matchInfo.seriesName) {
              seriesDetails = {
                id: match.matchInfo.seriesId,
                name: match.matchInfo.seriesName,
                format: match.matchInfo.matchFormat
              };
            }
          }
        });
      }
    });

    // Sort matches by start date
    allMatches.sort((a, b) => Number(a.startDate) - Number(b.startDate));
    
    setSeriesInfo(seriesDetails);
    setMatches(allMatches);
    setMatchTypes(Array.from(uniqueMatchTypes));
    setLoading(false);
  }, [seriesId]);

  // Keep all the formatting functions
  const formatScore = (score, isTest = false) => {
    if (!score) return '';
    let result = [];
    
    if (score.inngs1) {
      const declared1 = score.inngs1.isDeclared ? 'd' : '';
      result.push(`${score.inngs1.runs}/${score.inngs1.wickets || 0}${declared1} (${score.inngs1.overs || 0})`);
    }
    
    if (score.inngs2) {
      const declared2 = score.inngs2.isDeclared ? 'd' : '';
      result.push(`${score.inngs2.runs}/${score.inngs2.wickets || 0}${declared2} (${score.inngs2.overs || 0})`);
    }
    
    return result.join(' & ');
  };

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMatchStatusClass = (state, status) => {
    if (state === 'complete') {
      if (status.toLowerCase().includes('won')) {
        return "text-green-600 font-medium";
      } else if (status.toLowerCase().includes('drawn') || status.toLowerCase().includes('tied')) {
        return "text-amber-600 font-medium";
      }
      return "text-blue-600 font-medium";
    }
    return "text-violet-600 font-medium";
  };

  const getTeamLogo = (imageId) => {
    return imageId ? 
      `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${imageId}/png` : 
      '/images/team-placeholder.png';
  };

  // Filter matches only by match type now
  const filteredMatches = activeFilter === 'all' 
    ? matches 
    : matches.filter(match => match.matchDesc.startsWith(activeFilter));

  if (loading) {
    return (
      <div className={cx(
        "min-h-screen pt-20 pb-12",
        cricketTheme.background.main
      )}>
        <div className="text-center py-20">
          <div className={cx(
            "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-violet-500 border-r-transparent"
          )}></div>
          <p className={cx(
            "mt-4",
            cricketTheme.typography.body.medium
          )}>Loading matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cx(
      "min-h-screen pt-20 pb-12",
      cricketTheme.background.main
    )}>
      <div className={cx(
        "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      )}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <Link 
              to="/series" 
              className={cx(
                "mb-2 inline-flex items-center",
                cricketTheme.typography.body.small,
                "text-violet-600 hover:text-violet-800"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Series List
            </Link>
            <h1 className={cricketTheme.typography.heading[2]}>New Zealand tour of England, 2022</h1>
          </div>

          {/* Navigation tabs */}
          <div className={cx(
            cricketTheme.components.card.root,
            "p-1"
          )}>
            <div className="flex gap-1">
              <Link
                to={`/series/${seriesId}`}
                className={cx(
                  "px-3 py-1.5 rounded-md text-sm font-medium",
                  "text-violet-600 hover:text-violet-800"
                )}
              >
                Overview
              </Link>
              <Link
                to={`/series/${seriesId}/matches`}
                className={cx(
                  "px-3 py-1.5 rounded-md text-sm font-medium",
                  "bg-violet-100 text-violet-800"
                )}
              >
                Matches
              </Link>
              <Link
                to={`/series/${seriesId}/news`}
                className={cx(
                  "px-3 py-1.5 rounded-md text-sm font-medium",
                  "text-violet-600 hover:text-violet-800"
                )}
              >
                News
              </Link>
            </div>
          </div>
        </div>
      
        {/* Series info card */}
        {seriesInfo && (
          <div className={cx(
            cricketTheme.components.card.root,
            "overflow-hidden mb-8"
          )}>
            <div className={cx(
              "bg-gradient-to-r",
              seriesInfo.format === "TEST" ? "from-red-600 to-red-800" :
              seriesInfo.format === "ODI" ? "from-blue-600 to-blue-800" :
              "from-violet-600 to-violet-800",
              "px-6 py-4"
            )}>
              <h2 className="text-xl font-semibold text-white">{seriesInfo.name}</h2>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className={cx(
                  "inline-block px-2 py-1 text-xs font-medium rounded",
                  seriesInfo.format === "TEST" ? "bg-red-100 text-red-800" :
                  seriesInfo.format === "ODI" ? "bg-blue-100 text-blue-800" :
                  "bg-violet-100 text-violet-800"
                )}>
                  {seriesInfo.format}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-sm text-slate-600">
                  {matches.length} matches
                </span>
                {matches.length > 0 && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span className="text-sm text-slate-600">
                      {formatDate(matches[0].startDate)} - {formatDate(matches[matches.length-1].endDate)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Match type filters */}
        {matchTypes.length > 0 && (
          <div className="flex justify-end mb-6">
            <div className={cx(
              cricketTheme.components.card.root,
              "p-1"
            )}>
              <button
                onClick={() => setActiveFilter('all')}
                className={cx(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  activeFilter === 'all'
                    ? 'bg-violet-100 text-violet-800'
                    : 'text-slate-600 hover:text-slate-900'
                )}
              >
                All Matches
              </button>
              {matchTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={cx(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    activeFilter === type
                      ? 'bg-violet-100 text-violet-800'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Matches list */}
        {filteredMatches.length === 0 ? (
          <div className={cx(
            cricketTheme.components.card.root,
            "p-8 text-center"
          )}>
            <p className={cricketTheme.typography.body.medium}>
              No matches found for the selected filter.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredMatches.map((match, idx) => (
              <div 
                key={match.matchId} 
                className={cx(
                  cricketTheme.components.card.root,
                  "overflow-hidden transition-shadow hover:shadow-lg"
                )}
              >
                <div className="px-6 py-3 bg-slate-50 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <div className="font-medium text-slate-800">{match.matchDesc}</div>
                    <div className="text-sm text-slate-500">
                      {formatDate(match.startDate)} {match.matchFormat === "TEST" && `- ${formatDate(match.endDate)}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cx(
                      "text-xs px-2 py-0.5 rounded",
                      match.matchFormat === "TEST" ? "bg-red-100 text-red-800" :
                      match.matchFormat === "ODI" ? "bg-blue-100 text-blue-800" :
                      "bg-violet-100 text-violet-800"
                    )}>
                      {match.matchFormat}
                    </span>
                    <span className={cx(
                      "text-sm",
                      getMatchStatusClass(match.state, match.status)
                    )}>
                      {match.status}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-shrink-0">
                        <img 
                          src={getTeamLogo(match.team1.imageId)} 
                          alt={match.team1.teamName}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/team-placeholder.png';
                          }}
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{match.team1.teamName}</div>
                          <div className={cx(
                            "text-slate-700",
                            match.curBatTeamId === match.team1.teamId ? "font-semibold" : ""
                          )}>
                            {match.score?.team1Score && formatScore(match.score.team1Score, match.matchFormat === "TEST")}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-shrink-0">
                        <img 
                          src={getTeamLogo(match.team2.imageId)} 
                          alt={match.team2.teamName}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/team-placeholder.png';
                          }}
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{match.team2.teamName}</div>
                          <div className={cx(
                            "text-slate-700",
                            match.curBatTeamId === match.team2.teamId ? "font-semibold" : ""
                          )}>
                            {match.score?.team2Score && formatScore(match.score.team2Score, match.matchFormat === "TEST")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-sm text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {match.venueInfo.ground}, {match.venueInfo.city}
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

export default SeriesMatchesPage;