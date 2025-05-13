import { useParams, Link } from "react-router-dom";
import teamplayerData from "../data/teamplayerData.json";
import teamlistData from "../data/teamlistData.json";

function TeamPlayersPage() {
  const { teamId } = useParams();
  
  // Find the team name from teamlistData
  const team = teamlistData.list.find(t => t.teamId === teamId);
  const teamName = team ? team.teamName : `Team ${teamId}`;

  // Show all players for any team since we have limited data
  const players = teamplayerData.player.filter((p) => p.id); // filter out category headers

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Link to="/teams" className="text-blue-600 hover:text-blue-800 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-green-900">
          {teamName} Players
        </h1>
      </div>
      
      {players.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-gray-500 mb-4">No players found for this team.</p>
          <p className="text-sm text-gray-400">Try selecting a different team or check back later.</p>
          <div className="mt-6">
            <Link to="/teams" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Return to Teams
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <div
              key={player.id}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group hover:shadow-2xl"
              style={{ minHeight: 260 }}
            >
              {/* Show triangle only on hover */}
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                  background: "#0a2e5d"
                }}
              />
              {/* Jersey SVG or image */}
              <div className="absolute left-18 top-36 z-10 flex items-center justify-center">
                <svg
                  width="129"
                  height="119"
                  viewBox="0 0 129 119"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute"
                  style={{ zIndex: 1 }}
                >
                  <image
                    href="https://www.bcci.tv/img/india-tshirt.svg"
                    width="129"
                    height="119"
                  />
                  {player.jerseyNumber && (
                    <text
                      x="50%"
                      y="60%"
                      textAnchor="middle"
                      fill="#FFD700"
                      fontSize="36"
                      fontWeight="bold"
                      fontFamily="Arial, sans-serif"
                      dominantBaseline="middle"
                      style={{ filter: "drop-shadow(1px 1px 2px #0008)" }}
                    >
                      {player.jerseyNumber}
                    </text>
                  )}
                </svg>
              </div>
              {/* Player image */}
              <div className="absolute right-4 top-4 z-20">
                <img
                  src="https://www.bing.com/th/id/OIP.HAUYFeZOQuPDfsT5ORpMygAAAA?w=117&h=106&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                  alt="Player"
                  className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Player name */}
              <div className="relative z-30 pt-6 pl-4">
                <div className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">{player.name}</div>
                <div className="text-sm text-gray-600 group-hover:text-white/80 transition-colors duration-300">
                  {player.country || "India"}
                </div>
              </div>
              {/* Info bar */}
              <div className="absolute bottom-4 left-4 w-[92%] flex bg-[#eaf6fb] rounded-xl shadow border border-[#dbeafe] z-30 h-14 items-center">
                <div className="flex-1 flex flex-col items-center justify-center border-r border-[#cbd5e1] h-full">
                  <span className="flex items-center gap-1 text-base font-bold text-gray-800">
                    {player.role === "Allrounder" ? (
                      <>
                        <img
                          src="https://img.icons8.com/ios-filled/24/000000/cricket.png"
                          alt="All Rounder Icon"
                          className="w-5 h-5 inline-block"
                        />
                        All Rounder
                      </>
                    ) : player.role === "Bowler" ? (
                      <>
                        <img
                          src="https://img.icons8.com/?size=100&id=lQ5sOyY4pyBa&format=png&color=000000"
                          alt="Ball Icon"
                          className="w-5 h-5 inline-block"
                        />
                        Bowler
                      </>
                    ) : (
                      <>
                        <img
                          src="https://img.icons8.com/?size=100&id=zlfVHd7J682h&format=png&color=000000"
                          alt="Bat Icon"
                          className="w-5 h-5 inline-block"
                        />
                        Batter
                      </>
                    )}
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center border-r border-[#cbd5e1] h-full">
                  <span className="text-xs text-gray-500">Age</span>
                  <span className="font-semibold text-gray-800 text-base">{player.age || 36}</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center h-full">
                  <span className="text-xs text-gray-500">Style</span>
                  <span className="font-semibold text-gray-800 text-base">
                    {player.battingStyle && player.battingStyle.startsWith("Right") ? "RHB" : "LHB"}
                  </span>
                </div>
              </div>
              {/* Left-side bottom-corner SVG */}
              <img
                src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iMTIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDg0VjBsNDQgMTIwSDMyLjVMMCA4NFoiIGZpbGw9IiMxMzNGN0UiLz48cGF0aCBkPSJNMCAxMjB2LTE4bDE5IDE4SDBaIiBmaWxsPSIjRjc4RjFFIi8+PC9zdmc+"
                alt="Left Corner Decoration"
                className="absolute bottom-0 w-44px h-120px"
                draggable={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamPlayersPage;