import { useState } from "react";
import trendingData from "../data/playerlisttrendingData.json";
import playerBattingData from "../data/playerbatinData.json";
import playerBowlingData from "../data/playerbolwingData.json";
import playerCareerData from "../data/playercareerData.json";
import playerInfoData from "../data/playerinfoData.json";
import { cricketTheme, cx } from "../theme/theme.jsx";

function PlayersPage() {
  const [sidebarTab, setSidebarTab] = useState("TRENDING SEARCHES");

  // Helper to get player image URL (for static demo)
  const getFaceImage = (faceImageId) =>
    faceImageId
      ? `https://th.bing.com/th/id/OIP.HAUYFeZOQuPDfsT5ORpMygAAAA?w=186&h=186&c=7&r=0&o=5&pid=1.7`
      : "/images/players/static-player.jpg";

  return (
    <div className={cx(
      "flex min-h-auto",
      cricketTheme.background.main
    )}>
      {/* Sidebar - Fixed height and position */}
      <div className={cx(
        "w-72 bg-gradient-to-b from-violet-900 to-violet-800 text-white flex flex-col py-8 px-4 h-125 rounded"
      )}>
        <div className="text-2xl font-bold mb-8 text-center text-violet-100 border-b border-violet-700 pb-4">
          Players Directory
        </div>
        {["TRENDING SEARCHES", "Batting", "Bowling", "Career", "Info"].map((tab) => (
          <button
            key={tab}
            className={cx(
              "mb-3 px-5 py-3 rounded-lg text-left font-semibold transition-all duration-200",
              sidebarTab === tab 
                ? "bg-violet-700 shadow-md text-white" 
                : "hover:bg-violet-800/70 text-violet-200"
            )}
            onClick={() => setSidebarTab(tab)}
          >
            {tab}
          </button>
        ))}
        
        <div className="mt-auto pt-6 border-t border-violet-300 text-xs text-violet-300 text-center">
          Cricket Players Database
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 p-8 overflow-y-auto h-125">
        {sidebarTab === "TRENDING SEARCHES" && (
          <div>
            <h2 className={cx(
              "mb-6 border-b pb-2",
              cricketTheme.typography.heading[2]
            )}>Trending Players</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {trendingData.player.map((player) => (
                <div
                  key={player.id}
                  className={cx(
                    cricketTheme.components.card.root,
                    cricketTheme.components.card.hover,
                    "overflow-hidden transform hover:-translate-y-1"
                  )}
                >
                  <div className={cx(
                    "h-16 flex items-center justify-center",
                    "bg-gradient-to-r",
                    cricketTheme.colors.primary.gradient
                  )}>
                    <img
                      src={getFaceImage(player.faceImageId)}
                      alt={player.name}
                      className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md mt-8"
                      draggable={false}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/players/static-player.jpg";
                      }}
                    />
                  </div>
                  <div className="pt-12 pb-4 px-4 text-center">
                    <div className={cx(
                      "text-lg font-bold",
                      cricketTheme.typography.heading[5]
                    )}>{player.name}</div>
                    <div className="text-sm text-violet-600 mb-2">{player.teamName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sidebarTab === "Batting" && (
          <div>
            <h2 className={cx(
              "mb-6 border-b pb-2",
              cricketTheme.typography.heading[2]
            )}>Batting Statistics</h2>
            <div className={cx(
              cricketTheme.components.card.root,
              "overflow-hidden"
            )}>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className={cx(
                      "bg-gradient-to-r",
                      cricketTheme.colors.primary.gradient,
                      "text-white"
                    )}>
                      {playerBattingData.headers.map((h) => (
                        <th key={h} className="px-4 py-3 font-semibold text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {playerBattingData.values.map((row, idx) => (
                      <tr key={idx} className={`border-t border-violet-50 ${idx % 2 === 0 ? 'bg-violet-50/50' : 'bg-white'}`}>
                        {row.values.map((v, i) => (
                          <td key={i} className="px-4 py-3">{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {sidebarTab === "Bowling" && (
          <div>
            <h2 className={cx(
              "mb-6 border-b pb-2",
              cricketTheme.typography.heading[2]
            )}>Bowling Statistics</h2>
            <div className={cx(
              cricketTheme.components.card.root,
              "overflow-hidden"
            )}>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className={cx(
                      "bg-gradient-to-r",
                      cricketTheme.colors.primary.gradient,
                      "text-white"
                    )}>
                      {playerBowlingData.headers.map((h) => (
                        <th key={h} className="px-4 py-3 font-semibold text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {playerBowlingData.values.map((row, idx) => (
                      <tr key={idx} className={`border-t border-violet-50 ${idx % 2 === 0 ? 'bg-violet-50/50' : 'bg-white'}`}>
                        {row.values.map((v, i) => (
                          <td key={i} className="px-4 py-3">{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {sidebarTab === "Career" && (
          <div>
            <h2 className={cx(
              "mb-6 border-b pb-2",
              cricketTheme.typography.heading[2]
            )}>Career Timeline</h2>
            <div className="grid grid-cols-1 gap-6">
              {playerCareerData.values.map((career, idx) => (
                <div 
                  key={idx}
                  className={cx(
                    cricketTheme.components.card.root,
                    "p-6"
                  )}
                >
                  <div className="flex items-center mb-3">
                    <div className={cx(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold",
                      "bg-gradient-to-r",
                      cricketTheme.colors.primary.gradient
                    )}>
                      {career.name.toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-violet-800">
                        {career.name === "t20" ? "T20 International" : 
                         career.name === "test" ? "Test Cricket" :
                         career.name === "odi" ? "One Day International" :
                         career.name === "ipl" ? "Indian Premier League" :
                         career.name === "cl" ? "Champions League" : career.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="ml-16 space-y-2">
                    <div className="flex">
                      <span className="w-24 text-violet-600 font-medium">Debut:</span>
                      <span>{career.debut}</span>
                    </div>
                    <div className="flex">
                      <span className="w-24 text-violet-600 font-medium">Last Played:</span>
                      <span>{career.lastPlayed}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sidebarTab === "Info" && (
          <div>
            <h2 className={cx(
              "mb-6 border-b pb-2",
              cricketTheme.typography.heading[2]
            )}>Player Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Player Image and Basic Info */}
              <div className={cx(
                cricketTheme.components.card.root,
                "p-6 text-center md:col-span-1"
              )}>
                <div className="mb-4">
                  <img 
                    src={"https://th.bing.com/th/id/OIP.-vyaowLBcc7aX3NGp7JBzAHaHa?w=163&h=180&c=7&r=0&o=5&pid=1.7"}
                    alt={playerInfoData.name}
                    className="w-48 h-48 object-cover rounded-full mx-auto border-4 border-white shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/players/static-player.jpg";
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-violet-800 mb-1">{playerInfoData.name}</h3>
                <div className="text-violet-600 mb-2">{playerInfoData.nickName}</div>
                <div className={cx(
                  cricketTheme.components.badge.primary,
                  "inline-block mb-4"
                )}>
                  {playerInfoData.role}
                </div>
                
                <div className="text-left mt-6 space-y-3">
                  <div className="flex">
                    <span className="w-24 text-violet-600 font-medium">Born:</span>
                    <span>{playerInfoData.DoB}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-violet-600 font-medium">Birthplace:</span>
                    <span>{playerInfoData.birthPlace}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-violet-600 font-medium">Batting:</span>
                    <span>{playerInfoData.bat}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-violet-600 font-medium">Bowling:</span>
                    <span>{playerInfoData.bowl}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-violet-600 font-medium">Height:</span>
                    <span>{playerInfoData.height}</span>
                  </div>
                </div>
              </div>
              
              {/* Player Bio and Teams */}
              <div className={cx(
                cricketTheme.components.card.root,
                "p-6 md:col-span-2"
              )}>
                <h3 className="text-xl font-bold text-violet-800 mb-4">Biography</h3>
                <div 
                  className="text-slate-700 mb-8 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: playerInfoData.bio }}
                />
                
                <h3 className="text-xl font-bold text-violet-800 mb-4">Teams</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {playerInfoData.teamNameIds?.map((team, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm"
                    >
                      {team.teamName}
                    </span>
                  ))}
                </div>
                
                {playerInfoData.rankings?.bat && Object.keys(playerInfoData.rankings.bat).length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-violet-800 mb-4">Rankings</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {playerInfoData.rankings.bat.testRank && (
                        <div className="bg-violet-50 p-3 rounded-lg text-center">
                          <div className="text-sm text-violet-600 mb-1">Test Rank</div>
                          <div className="text-2xl font-bold text-violet-800">{playerInfoData.rankings.bat.testRank}</div>
                        </div>
                      )}
                      {playerInfoData.rankings.bat.testBestRank && (
                        <div className="bg-violet-50 p-3 rounded-lg text-center">
                          <div className="text-sm text-violet-600 mb-1">Best Test Rank</div>
                          <div className="text-2xl font-bold text-violet-800">{playerInfoData.rankings.bat.testBestRank}</div>
                        </div>
                      )}
                      {playerInfoData.rankings.bat.odiBestRank && (
                        <div className="bg-violet-50 p-3 rounded-lg text-center">
                          <div className="text-sm text-violet-600 mb-1">Best ODI Rank</div>
                          <div className="text-2xl font-bold text-violet-800">{playerInfoData.rankings.bat.odiBestRank}</div>
                        </div>
                      )}
                      {playerInfoData.rankings.bat.t20BestRank && (
                        <div className="bg-violet-50 p-3 rounded-lg text-center">
                          <div className="text-sm text-violet-600 mb-1">Best T20 Rank</div>
                          <div className="text-2xl font-bold text-violet-800">{playerInfoData.rankings.bat.t20BestRank}</div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayersPage;
