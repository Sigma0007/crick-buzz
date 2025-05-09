import { useState } from "react";
import trendingData from "../data/playerlisttrendingData.json";
import playerBattingData from "../data/playerbatinData.json";
import playerBowlingData from "../data/playerbolwingData.json";
import playerCareerData from "../data/playercareerData.json";
import playerInfoData from "../data/playerinfoData.json";

function PlayersPage() {
  const [sidebarTab, setSidebarTab] = useState("TRENDING SEARCHES");

  // Helper to get player image URL (for static demo)
  const getFaceImage = (faceImageId) =>
    faceImageId
      ? `https://www.cricbuzz.com/stats/img/faceImages/${faceImageId}.jpg`
      : "/images/players/static-player.jpg";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col py-8 px-4 shadow-xl">
        <div className="text-2xl font-bold mb-8 text-center text-blue-100 border-b border-blue-700 pb-4">
          Players Directory
        </div>
        {["TRENDING SEARCHES", "Batting", "Bowling", "Career", "Info"].map((tab) => (
          <button
            key={tab}
            className={`mb-3 px-5 py-3 rounded-lg text-left font-semibold transition-all duration-200 ${
              sidebarTab === tab 
                ? "bg-blue-700 shadow-md text-white" 
                : "hover:bg-blue-800/70 text-blue-200"
            }`}
            onClick={() => setSidebarTab(tab)}
          >
            {tab}
          </button>
        ))}
        
        <div className="mt-auto pt-6 border-t border-blue-700 text-xs text-blue-300 text-center">
          Cricket Players Database
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        {sidebarTab === "TRENDING SEARCHES" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-900 border-b pb-2">Trending Players</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {trendingData.player.map((player) => (
                <div
                  key={player.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-r from-blue-800 to-blue-600 h-16 flex items-center justify-center">
                    <img
                      src="https://tse2.mm.bing.net/th/id/OIP.TtNoDLGVS57lzi6DR3eK9gHaHa?w=139&h=180&c=7&r=0&o=5&pid=1.7"
                      alt={player.name}
                      className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md mt-8"
                      draggable={false}
                    />
                  </div>
                  <div className="pt-12 pb-4 px-4 text-center">
                    <div className="text-lg font-bold text-blue-900">{player.name}</div>
                    <div className="text-sm text-blue-600 mb-2">{player.teamName}</div>
                    {/* <div className="text-xs bg-blue-100 text-blue-800 rounded-full px-3 py-1 inline-block">
                      View Profile
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sidebarTab === "Batting" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-900 border-b pb-2">Batting Statistics</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">
                    {playerBattingData.headers.map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {playerBattingData.values.map((row, idx) => (
                    <tr key={idx} className={`border-t border-blue-50 ${idx % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'}`}>
                      {row.values.map((v, i) => (
                        <td key={i} className="px-4 py-3">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {sidebarTab === "Bowling" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-900 border-b pb-2">Bowling Statistics</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">
                    {playerBowlingData.headers.map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {playerBowlingData.values.map((row, idx) => (
                    <tr key={idx} className={`border-t border-blue-50 ${idx % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'}`}>
                      {row.values.map((v, i) => (
                        <td key={i} className="px-4 py-3">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {sidebarTab === "Career" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-900 border-b pb-2">Career Timeline</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">
                    <th className="px-4 py-3 font-semibold text-left">Format</th>
                    <th className="px-4 py-3 font-semibold text-left">Debut</th>
                    <th className="px-4 py-3 font-semibold text-left">Last Played</th>
                  </tr>
                </thead>
                <tbody>
                  {playerCareerData.values.map((row, idx) => (
                    <tr key={idx} className={`border-t border-blue-50 ${idx % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'}`}>
                      <td className="px-4 py-3 font-medium text-blue-800">{row.name}</td>
                      <td className="px-4 py-3">{row.debut}</td>
                      <td className="px-4 py-3">{row.lastPlayed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {sidebarTab === "Info" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-900 border-b pb-2">Player Information</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-blue-100 rounded-xl p-6">
                    <div className="text-center mb-4">
                      <img 
                        src="https://tse2.mm.bing.net/th/id/OIP.TtNoDLGVS57lzi6DR3eK9gHaHa?w=139&h=180&c=7&r=0&o=5&pid=1.7" 
                        alt={playerInfoData.name}
                        className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md mx-auto"
                      />
                      <h3 className="text-xl font-bold text-blue-900 mt-3">{playerInfoData.name}</h3>
                      <p className="text-blue-600 text-sm">{playerInfoData.nickName}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-blue-800 font-medium">Role:</div>
                      <div>{playerInfoData.role}</div>
                      
                      <div className="text-blue-800 font-medium">Batting:</div>
                      <div>{playerInfoData.bat}</div>
                      
                      <div className="text-blue-800 font-medium">Bowling:</div>
                      <div>{playerInfoData.bowl}</div>
                      
                      <div className="text-blue-800 font-medium">Birth:</div>
                      <div>{playerInfoData.DoB}</div>
                      
                      <div className="text-blue-800 font-medium">Place:</div>
                      <div>{playerInfoData.birthPlace}</div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 overflow-y-auto max-h-[483px] pr-4 scrollbar-thin ">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Biography</h3>
                  <div className="text-gray-700 leading-relaxed" 
                    dangerouslySetInnerHTML={{ __html: playerInfoData.bio }} 
                  />
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Teams</h3>
                    <div className="flex flex-wrap gap-2">
                      {playerInfoData.teams.split(',').map((team, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
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
