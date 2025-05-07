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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col py-8 px-4">
        <div className="text-2xl font-bold mb-8 text-center">Players</div>
        {["TRENDING SEARCHES", "Batting", "Bowling", "Career", "Info"].map((tab) => (
          <button
            key={tab}
            className={`mb-2 px-4 py-2 rounded text-left font-semibold ${
              sidebarTab === tab ? "bg-blue-700" : "hover:bg-blue-800"
            }`}
            onClick={() => setSidebarTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">
        {sidebarTab === "TRENDING SEARCHES" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Trending Players</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {trendingData.player.map((player) => (
                <div
                  key={player.id}
                  className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center"
                >
                  <img
                    src={getFaceImage(player.faceImageId)}
                    alt={player.name}
                    className="w-20 h-20 object-cover rounded-full border-4 border-blue-200 shadow mb-2"
                    draggable={false}
                  />
                  <div className="text-lg font-bold text-blue-900 text-center">{player.name}</div>
                  <div className="text-xs text-blue-600">{player.teamName}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sidebarTab === "Batting" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Batting Stats</h2>
            <table className="min-w-full text-xs border border-blue-100 rounded-lg">
              <thead>
                <tr>
                  {playerBattingData.headers.map((h) => (
                    <th key={h} className="px-2 py-1 bg-blue-50 font-bold text-blue-900">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {playerBattingData.values.map((row, idx) => (
                  <tr key={idx} className="border-t border-blue-50">
                    {row.values.map((v, i) => (
                      <td key={i} className="px-2 py-1 text-center">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {sidebarTab === "Bowling" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Bowling Stats</h2>
            <table className="min-w-full text-xs border border-blue-100 rounded-lg">
              <thead>
                <tr>
                  {playerBowlingData.headers.map((h) => (
                    <th key={h} className="px-2 py-1 bg-blue-50 font-bold text-blue-900">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {playerBowlingData.values.map((row, idx) => (
                  <tr key={idx} className="border-t border-blue-50">
                    {row.values.map((v, i) => (
                      <td key={i} className="px-2 py-1 text-center">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {sidebarTab === "Career" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Career</h2>
            <table className="min-w-full text-xs border border-blue-100 rounded-lg">
              <thead>
                <tr>
                  <th className="px-2 py-1 bg-blue-50 font-bold text-blue-900">Format</th>
                  <th className="px-2 py-1 bg-blue-50 font-bold text-blue-900">Debut</th>
                  <th className="px-2 py-1 bg-blue-50 font-bold text-blue-900">Last Played</th>
                </tr>
              </thead>
              <tbody>
                {playerCareerData.values.map((row, idx) => (
                  <tr key={idx} className="border-t border-blue-50">
                    <td className="px-2 py-1 text-center">{row.name}</td>
                    <td className="px-2 py-1 text-center">{row.debut}</td>
                    <td className="px-2 py-1 text-center">{row.lastPlayed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {sidebarTab === "Info" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Player Info</h2>
            <div className="text-sm text-gray-700">
              <div><b>Name:</b> {playerInfoData.name}</div>
              <div><b>Nickname:</b> {playerInfoData.nickName}</div>
              <div><b>Role:</b> {playerInfoData.role}</div>
              <div><b>Batting:</b> {playerInfoData.bat}</div>
              <div><b>Bowling:</b> {playerInfoData.bowl}</div>
              <div><b>Birth Place:</b> {playerInfoData.birthPlace}</div>
              <div><b>Date of Birth:</b> {playerInfoData.DoB}</div>
              <div><b>Teams:</b> {playerInfoData.teams}</div>
              <div className="mt-2"><b>Bio:</b> <span dangerouslySetInnerHTML={{ __html: playerInfoData.bio.split('<br/>').slice(0, 2).join('<br/>') + '...' }} /></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayersPage;
