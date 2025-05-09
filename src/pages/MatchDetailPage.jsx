import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Popup from "../components/Popup";
import matchData from "../data/matchData.json";

const tabList = [
  { key: "summary", label: "Summary", icon: "📊" },
  { key: "squads", label: "Squads", icon: "👥" },
  { key: "awards", label: "Awards", icon: "🏆" },
];

function PlayerCard({ player }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg shadow hover:shadow-md transition p-3 mb-3 border border-gray-100 hover:border-green-200">
      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
        {player.name[0]}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-gray-800 flex items-center gap-2">
          {player.name}
          {player.captain && (
            <span className="text-xs bg-yellow-300 text-yellow-800 px-2 py-0.5 rounded-full font-bold">C</span>
          )}
          {player.keeper && (
            <span className="text-xs bg-blue-300 text-blue-800 px-2 py-0.5 rounded-full font-bold">WK</span>
          )}
          {player.substitute && (
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">Sub</span>
          )}
        </div>
        <div className="text-xs text-gray-500 flex gap-2 mt-1">
          {player.role && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{player.role}</span>}
          {player.battingStyle && <span className="px-2 py-0.5 bg-blue-50 rounded-full">{player.battingStyle}</span>}
          {player.bowlingStyle && <span className="px-2 py-0.5 bg-green-50 rounded-full">{player.bowlingStyle}</span>}
        </div>
      </div>
    </div>
  );
}

function MatchDetailPage() {
  const { matchId } = useParams();
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [tab, setTab] = useState("summary");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Find the match in the static data
  let info = null;
  for (const typeMatch of matchData.typeMatches) {
    for (const seriesMatch of typeMatch.seriesMatches) {
      if (seriesMatch.seriesAdWrapper && seriesMatch.seriesAdWrapper.matches) {
        for (const match of seriesMatch.seriesAdWrapper.matches) {
          if (String(match.matchInfo.matchId) === String(matchId)) {
            info = match;
            break;
          }
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading match details...</p>
        </div>
      </div>
    );
  }

  if (!info || !info.matchInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Match Not Found</h2>
          <p className="text-gray-500 mb-4">We couldn't find any details for this match.</p>
          <a href="/" className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Back to Matches
          </a>
        </div>
      </div>
    );
  }

  const { matchInfo } = info;
  const team1 = matchInfo.team1;
  const team2 = matchInfo.team2;
  const series = matchInfo.series?.name || matchInfo.seriesName || "Series";
  const status = matchInfo.status || "";
  const startDate = matchInfo.startDate
    ? new Date(Number(matchInfo.startDate)).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : "";
  const toss = matchInfo.tossResults
    ? `${matchInfo.tossResults.tossWinnerName} won the toss and chose to ${matchInfo.tossResults.decision}`
    : "";
  const result = matchInfo.result
    ? `${matchInfo.result.winningTeam} won by ${matchInfo.result.winningMargin} ${matchInfo.result.winByRuns ? "runs" : "wickets"}`
    : matchInfo.shortStatus || "";

  // For team logos, you can use a placeholder or a mapping if you have images
  // TEMP: Replace teamLogo with a simple initials badge
  const teamInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map(w => w[0]).join("").toUpperCase();
  };

  // Get team color based on team name
  const getTeamColor = (teamName) => {
    if (!teamName) return "from-blue-500 to-blue-700";
    
    const teamColors = {
      'India': "from-blue-500 to-blue-700",
      'Australia': "from-yellow-500 to-yellow-700",
      'England': "from-red-500 to-red-700",
      'New Zealand': "from-gray-700 to-black",
      'South Africa': "from-green-500 to-green-700",
      'West Indies': "from-purple-500 to-purple-700",
      'Pakistan': "from-green-600 to-green-800",
      'Sri Lanka': "from-blue-400 to-blue-600",
      'Bangladesh': "from-green-500 to-green-700",
      'Afghanistan': "from-blue-600 to-blue-800",
    };
    
    // Find the team by checking if the teamName includes any of the keys
    for (const [key, value] of Object.entries(teamColors)) {
      if (teamName.includes(key)) {
        return value;
      }
    }
    
    return "from-blue-500 to-blue-700";
  };

  const team1Color = getTeamColor(team1?.name);
  const team2Color = getTeamColor(team2?.name);

  return (
    <>
      {showLimitPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowLimitPopup(false)}
        />
      )}
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Match Header Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-indigo-800 to-blue-900 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${team1Color} flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow-lg`}>
                    {teamInitials(team1?.name)}
                  </div>
                  <div className="text-4xl font-bold text-white">VS</div>
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${team2Color} flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow-lg`}>
                    {teamInitials(team2?.name)}
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{series}</h2>
                  <div className="text-lg md:text-xl font-bold text-blue-100">
                    {team1?.name} vs {team2?.name}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.includes('Live') ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-200 text-blue-900'}`}>
                      {status}
                    </span>
                    {result && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-900">
                        {result}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Match Info Bar */}
              <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-sm flex flex-wrap gap-4 justify-between">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {startDate}
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a1.5 1.5 0 10-2.121 2.121l4.243 4.243a1 1 0 001.414-1.414zM10 20a10 10 0 1110-10 10.011 10.011 0 01-10 10z" />
                  </svg>
                  {info.matchInfo.venueInfo?.ground}, {info.matchInfo.venueInfo?.city}
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {matchInfo.matchFormat}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {tabList.map((t) => (
                <button
                  key={t.key}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                    tab === t.key
                      ? "border-b-4 border-blue-600 text-blue-800 bg-blue-50"
                      : "text-gray-500 hover:text-blue-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setTab(t.key)}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {tab === "summary" && (
                <div className="space-y-6">
                  {/* Toss Information */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Toss
                    </h3>
                    <p className="text-blue-700">{toss || "No toss information available"}</p>
                  </div>
                  
                  {/* Match Description */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="font-bold text-gray-700 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Match Information
                    </h3>
                    <p className="text-gray-600">{matchInfo.matchDescription || "No description available"}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
                        {matchInfo.matchFormat}
                      </span>
                      {matchInfo.seriesName && (
                        <span className="px-3 py-1 bg-blue-100 rounded-full text-xs text-blue-700">
                          {matchInfo.seriesName}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Venue Information */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <h3 className="font-bold text-green-800 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a1.5 1.5 0 10-2.121 2.121l4.243 4.243a1 1 0 001.414-1.414zM10 20a10 10 0 1110-10 10.011 10.011 0 01-10 10z" />
                      </svg>
                      Venue
                    </h3>
                    <div className="flex items-center gap-4">
                      {info.matchInfo.venueInfo?.imageUrl ? (
                        <img 
                          src={info.matchInfo.venueInfo.imageUrl} 
                          alt={info.matchInfo.venueInfo.ground} 
                          className="w-24 h-16 object-cover rounded-lg shadow-sm" 
                        />
                      ) : (
                        <div className="w-24 h-16 bg-green-200 rounded-lg flex items-center justify-center text-green-700">
                          No Image
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-green-700">{info.matchInfo.venueInfo?.ground}</div>
                        <div className="text-green-600 text-sm">{info.matchInfo.venueInfo?.city}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab === "squads" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className={`font-bold text-lg mb-4 px-4 py-2 rounded-lg bg-gradient-to-r ${team1Color} text-white`}>
                      {team1?.name} Squad
                    </div>
                    <div className="space-y-2">
                      {team1?.playerDetails?.length > 0 ? (
                        team1.playerDetails.map((player) => (
                          <PlayerCard key={player.id} player={player} />
                        ))
                      ) : (
                        <div className="text-center p-6 bg-gray-50 rounded-lg text-gray-500">
                          No squad information available
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className={`font-bold text-lg mb-4 px-4 py-2 rounded-lg bg-gradient-to-r ${team2Color} text-white`}>
                      {team2?.name} Squad
                    </div>
                    <div className="space-y-2">
                      {team2?.playerDetails?.length > 0 ? (
                        team2.playerDetails.map((player) => (
                          <PlayerCard key={player.id} player={player} />
                        ))
                      ) : (
                        <div className="text-center p-6 bg-gray-50 rounded-lg text-gray-500">
                          No squad information available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {tab === "awards" && (
                <div className="space-y-6">
                  <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                    <h3 className="font-bold text-yellow-800 mb-4 flex items-center text-lg">
                      <span className="mr-2">🏆</span>
                      Player of the Match
                    </h3>
                    {matchInfo.playersOfTheMatch && matchInfo.playersOfTheMatch.length > 0 ? (
                      <div className="space-y-3">
                        {matchInfo.playersOfTheMatch.map((p) => (
                          <div key={p.id} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm border border-yellow-100">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                              {p.name[0]}
                            </div>
                            <div>
                              <div className="font-bold text-gray-800">{p.name}</div>
                              <div className="text-sm text-gray-500">{p.teamName}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-6 bg-white rounded-lg text-gray-500 border border-gray-100">
                        No player of the match awarded yet
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="font-bold text-blue-800 mb-4 flex items-center text-lg">
                      <span className="mr-2">🥇</span>
                      Player of the Series
                    </h3>
                    {matchInfo.playersOfTheSeries && matchInfo.playersOfTheSeries.length > 0 ? (
                      <div className="space-y-3">
                        {matchInfo.playersOfTheSeries.map((p) => (
                          <div key={p.id} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                              {p.name[0]}
                            </div>
                            <div>
                              <div className="font-bold text-gray-800">{p.name}</div>
                              <div className="text-sm text-gray-500">{p.teamName}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-6 bg-white rounded-lg text-gray-500 border border-gray-100">
                        No player of the series awarded yet
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MatchDetailPage;
