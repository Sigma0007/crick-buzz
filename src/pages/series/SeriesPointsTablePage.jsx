import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import seriespointtabseData from "../../data/seriespointtabseData.json";
import seriesmatchesData from "../../data/seriesmatchesData.json";
import { cricketTheme, cx, getSeriesFormatColor } from "../../theme/theme.jsx";

function SeriesPointsTablePage() {
  const { seriesId } = useParams();
  const [series, setSeries] = useState(null);
  const [players, setPlayers] = useState([]);
  const [pointsTable, setPointsTable] = useState(null);
  const [activeTab, setActiveTab] = useState("squad"); // Default to squad since we have that data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let foundSeries = false;
    
    // Get series info from matches data
    if (seriesmatchesData?.matchDetails) {
      const seriesMatches = [];
      let seriesInfo = null;
      
      // Extract all matches for this series and get series info
      for (const detail of seriesmatchesData.matchDetails) {
        if (detail?.matchDetailsMap?.match) {
          for (const match of detail.matchDetailsMap.match) {
            if (String(match.matchInfo?.seriesId) === String(seriesId)) {
              seriesMatches.push(match);
              
              if (!seriesInfo) {
                seriesInfo = {
                  id: match.matchInfo.seriesId,
                  name: match.matchInfo.seriesName,
                  format: match.matchInfo.matchFormat
                };
              }
            }
          }
        }
      }
      
      if (seriesInfo) {
        setSeries(seriesInfo);
        foundSeries = true;
        
        // Generate points table from matches
        if (seriesMatches.length > 0) {
          const teams = new Map();
          
          // Process each match to build team stats
          seriesMatches.forEach(match => {
            const team1Id = match.matchInfo.team1.teamId;
            const team2Id = match.matchInfo.team2.teamId;
            
            // Initialize teams if not already in the map
            if (!teams.has(team1Id)) {
              teams.set(team1Id, {
                teamId: team1Id,
                name: match.matchInfo.team1.teamName,
                shortName: match.matchInfo.team1.teamSName,
                imageId: match.matchInfo.team1.imageId,
                matches: 0,
                won: 0,
                lost: 0,
                tied: 0,
                nr: 0,
                points: 0,
                nrr: 0
              });
            }
            
            if (!teams.has(team2Id)) {
              teams.set(team2Id, {
                teamId: team2Id,
                name: match.matchInfo.team2.teamName,
                shortName: match.matchInfo.team2.teamSName,
                imageId: match.matchInfo.team2.imageId,
                matches: 0,
                won: 0,
                lost: 0,
                tied: 0,
                nr: 0,
                points: 0,
                nrr: 0
              });
            }
            
            // Only count completed matches
            if (match.matchInfo.state === "complete") {
              const team1 = teams.get(team1Id);
              const team2 = teams.get(team2Id);
              
              team1.matches++;
              team2.matches++;
              
              // Determine match result
              if (match.matchInfo.status.includes("won")) {
                const winnerTeamName = match.matchInfo.status.split(" won")[0].toUpperCase();
                
                if (winnerTeamName === match.matchInfo.team1.teamName) {
                  team1.won++;
                  team1.points += 2;
                  team2.lost++;
                } else if (winnerTeamName === match.matchInfo.team2.teamName) {
                  team2.won++;
                  team2.points += 2;
                  team1.lost++;
                }
              } else if (match.matchInfo.status.includes("tied")) {
                team1.tied++;
                team2.tied++;
                team1.points += 1;
                team2.points += 1;
              } else if (match.matchInfo.status.includes("drawn") || match.matchInfo.status.includes("no result")) {
                team1.nr++;
                team2.nr++;
                team1.points += 1;
                team2.points += 1;
              }
            }
          });
          
          // Calculate NRR (simplified version)
          teams.forEach(team => {
            team.nrr = ((team.won * 2) - (team.lost * 2)) / (team.matches || 1);
            team.nrr = team.nrr.toFixed(3);
          });
          
          // Convert to array and sort by points, then NRR
          const teamsArray = Array.from(teams.values()).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return b.nrr - a.nrr;
          });
          
          setPointsTable({
            headers: ["Team", "Matches", "Won", "Lost", "Tied", "NR", "Points", "NRR"],
            teams: teamsArray
          });
        }
      }
    }

    // Get players data
    if (seriespointtabseData?.player) {
      setPlayers(seriespointtabseData.player);
      
      // Always set active tab to "squad" since that's our primary data
      setActiveTab("squad");
      
      // If we have player data but no series data, create a default series object
      if (!foundSeries) {
        setSeries({
          id: seriesId,
          name: "Wellington Firebirds Squad",
          format: "T20"
        });
      }
    }

    // Create a mock points table with Wellington Firebirds data
    const mockPointsTable = {
      headers: ["Team", "Matches", "Won", "Lost", "Tied", "NR", "Points", "NRR"],
      teams: [
        {
          teamId: "1",
          name: "Wellington Firebirds",
          shortName: "WEL",
          matches: 10,
          won: 7,
          lost: 2,
          tied: 0,
          nr: 1,
          points: 15,
          nrr: "+1.234"
        }
      ]
    };
    
    setPointsTable(mockPointsTable);

    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [seriesId]);

  const getImageUrl = (imageId) => {
    return `https://www.cricbuzz.com/a/img/v1/75x75/i1/c${imageId}/player.jpg`;
  };

  // Modify the "if (!series)" check to also check for players
  if (loading) {
    return (
      <div className={cx(
        "min-h-screen pt-20 pb-12 flex items-center justify-center",
        cricketTheme.background.main
      )}>
        <div className={cricketTheme.components.loader.spinner}></div>
      </div>
    );
  }

  // Only show "Series Not Found" if we have neither series nor players data
  if (!series && players.length === 0) {
    return (
      <div className={cx(
        "min-h-screen pt-20 pb-12",
        cricketTheme.background.main
      )}>
        <div className={cx(
          cricketTheme.layout.container,
          "py-8"
        )}>
          <div className="text-center py-12">
            <h2 className={cricketTheme.typography.heading[2]}>Series Not Found</h2>
            <p className={cx(
              cricketTheme.typography.body.medium,
              "mt-4"
            )}>
              The series you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/series" 
              className={cx(
                cricketTheme.components.button.primary,
                "mt-6 inline-block"
              )}
            >
              Back to Series
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Group players by their role categories
  const playersByCategory = players.reduce((acc, player) => {
    if (player.isHeader) {
      acc.push({
        category: player.name,
        players: []
      });
    } else {
      if (acc.length > 0) {
        acc[acc.length - 1].players.push(player);
      }
    }
    return acc;
  }, []);

  const renderPlayerCard = (player) => {
    return (
      <div
        key={player.id}
        className={cx(
          cricketTheme.components.card.root,
          "flex items-start space-x-4 p-4 hover:shadow-md transition-shadow"
        )}
      >
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100">
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
          <div className={cx(
            cricketTheme.typography.body.large,
            "font-medium text-violet-900"
          )}>
            {player.name}
            {player.captain && (
              <span className={cx(
                "ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-violet-100 text-violet-800"
              )}>
                Captain
              </span>
            )}
          </div>
          <div className={cx(
            cricketTheme.typography.body.small,
            "text-violet-600 mt-1"
          )}>
            {player.role}
          </div>
          <div className="text-xs text-slate-500 mt-2 space-y-0.5">
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
    <div className={cx(
      "min-h-screen pt-20 pb-12",
      cricketTheme.background.main
    )}>
      <div className={cx(
        cricketTheme.layout.container,
        "py-8"
      )}>
        {/* Series Header */}
        <div className={cx(
          "relative overflow-hidden rounded-xl mb-8",
          "bg-gradient-to-r",
          getSeriesFormatColor(series?.format || "T20")
        )}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{series?.name || "Wellington Firebirds"}</h1>
                <p className="text-white/80">
                  Team Squad
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
          <div className="flex border-b">
            <button 
              onClick={() => setActiveTab("squad")}
              className={cx(
                "px-6 py-4 font-medium transition-colors",
                activeTab === "squad" 
                  ? "text-violet-900 border-b-2 border-violet-600" 
                  : "text-violet-600 hover:text-violet-800"
              )}
            >
              Team Squad
            </button>
            <button 
              onClick={() => setActiveTab("points")}
              className={cx(
                "px-6 py-4 font-medium transition-colors",
                activeTab === "points" 
                  ? "text-violet-900 border-b-2 border-violet-600" 
                  : "text-violet-600 hover:text-violet-800"
              )}
            >
              Team Stats
            </button>
          </div>
        </div>

        {activeTab === "points" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-violet-900">Team Statistics</h2>
              <p className="text-sm text-slate-500 mt-1">Wellington Firebirds Performance</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold text-violet-700 mb-2">
                    {players.filter(p => !p.isHeader).length}
                  </div>
                  <div className="text-sm text-slate-600">Squad Size</div>
                </div>
                
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold text-violet-700 mb-2">
                    {players.filter(p => p.role?.includes("Batter") && !p.isHeader).length}
                  </div>
                  <div className="text-sm text-slate-600">Batters</div>
                </div>
                
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold text-violet-700 mb-2">
                    {players.filter(p => p.role?.includes("Bowler") && !p.isHeader).length}
                  </div>
                  <div className="text-sm text-slate-600">Bowlers</div>
                </div>
                
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold text-violet-700 mb-2">
                    {players.filter(p => p.role?.includes("Allrounder") && !p.isHeader).length}
                  </div>
                  <div className="text-sm text-slate-600">All-rounders</div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-violet-900 mb-4">Team Composition</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="p-4 flex items-center">
                    <div className="w-12 h-12 bg-violet-200 rounded-full flex items-center justify-center text-violet-700 font-bold text-xl mr-4">
                      W
                    </div>
                    <div>
                      <h4 className="font-medium text-violet-900">Wellington Firebirds</h4>
                      <p className="text-sm text-slate-600">
                        Captain: {players.find(p => p.captain)?.name || "Michael Bracewell"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t">
                    <div className="p-4">
                      <h5 className="font-medium text-violet-900 mb-2">Squad Breakdown</h5>
                      <div className="space-y-2">
                        {playersByCategory.map((category, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span className="text-sm text-slate-600">{category.category}</span>
                            <span className="text-sm font-medium text-violet-900">{category.players.length} players</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "squad" && (
          <>
            {playersByCategory.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-slate-600">
                  No squad information available.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {playersByCategory.map((category, idx) => (
                  <div key={idx}>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="bg-violet-600 text-white px-6 py-4">
                        <h2 className="text-lg font-bold">{category.category}</h2>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.players.map(player => renderPlayerCard(player))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SeriesPointsTablePage;