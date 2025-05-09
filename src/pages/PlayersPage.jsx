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
      "flex min-h-screen",
      cricketTheme.background.main
    )}>
      {/* Sidebar */}
      <div className={cx(
        "w-72 bg-gradient-to-b from-violet-900 to-violet-800 text-white flex flex-col py-8 px-4 shadow-xl"
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
        
        <div className="mt-auto pt-6 border-t border-violet-700 text-xs text-violet-300 text-center">
          Cricket Players Database
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
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
                    <div className={cx(
                      cricketTheme.components.badge.primary,
                      "inline-block mt-1"
                    )}>
                      {player.role || "Player"}
                    </div>
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
                      <th className="px-4 py-3 font-semibold text-left">Format</th>
                      <th className="px-4 py-3 font-semibold text-left">Debut</th>
                      <th className="px-4 py-3 font-semibold text-left">Last Played</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerCareerData.values.map((row, idx) => (
                      <tr key={idx} className={`border-t border-violet-50 ${idx % 2 === 0 ? 'bg-violet-50/50' : 'bg-white'}`}>
                        <td className="px-4 py-3 font-medium text-violet-800">{row.name}</td>
                        <td className="px-4 py-3">{row.debut}</td>
                        <td className="px-4 py-3">{row.lastPlayed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {sidebarTab === "Info" && (
          <div>
            <h2 className={cx(
              "mb-6 border-b pb-2",
              cricketTheme.typography.heading[2]
            )}>Player Information</h2>
            <div className={cx(
              cricketTheme.components.card.root,
              "p-6"
            )}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className={cx(
                    "bg-violet-100 rounded-xl p-6",
                    cricketTheme.effects.glow
                  )}>
                    <div className="text-center mb-4">
                      <img 
                        src={getFaceImage(playerInfoData.faceImageId)} 
                        alt={playerInfoData.name}
                        className={cx(
                          "w-32 h-32 object-cover rounded-full border-4 border-white shadow-md mx-auto",
                          cricketTheme.effects.scale
                        )}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/players/static-player.jpg";
                        }}
                      />
                      <h3 className={cx(
                        "mt-3",
                        cricketTheme.typography.heading[4]
                      )}>{playerInfoData.name}</h3>
                      <p className="text-violet-600 text-sm">{playerInfoData.nickName}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-violet-800 font-medium">Role:</div>
                      <div>{playerInfoData.role}</div>
                      
                      <div className="text-violet-800 font-medium">Batting:</div>
                      <div>{playerInfoData.bat}</div>
                      
                      <div className="text-violet-800 font-medium">Bowling:</div>
                      <div>{playerInfoData.bowl}</div>
                      
                      <div className="text-violet-800 font-medium">Birth:</div>
                      <div>{playerInfoData.DoB}</div>
                      
                      <div className="text-violet-800 font-medium">Place:</div>
                      <div>{playerInfoData.birthPlace}</div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 overflow-y-auto max-h-[483px] pr-4 scrollbar-thin">
                  <h3 className={cx(
                    "mb-3",
                    cricketTheme.typography.heading[5]
                  )}>Biography</h3>
                  <div className={cx(
                    "leading-relaxed",
                    cricketTheme.typography.body.medium
                  )} 
                    dangerouslySetInnerHTML={{ __html: playerInfoData.bio }} 
                  />
                  
                  <div className="mt-6">
                    <h3 className={cx(
                      "mb-3",
                      cricketTheme.typography.heading[5]
                    )}>Teams</h3>
                    <div className="flex flex-wrap gap-2">
                      {playerInfoData.teams.split(',').map((team, idx) => (
                        <span key={idx} className={cx(
                          cricketTheme.components.badge.primary
                        )}>
                          {team.trim()}
                        </span>
                      ))}
                    </div>
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

export default PlayersPage;
