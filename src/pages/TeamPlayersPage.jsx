import { useParams } from "react-router-dom";
import teamplayerData from "../data/teamplayerData.json";

function TeamPlayersPage() {
  const { teamId } = useParams();

  const players =
    teamId === "2"
      ? teamplayerData.player.filter((p) => p.id) // filter out category headers
      : [];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-green-900 mb-6">
        Players for Team {teamId}
      </h1>
      {players.length === 0 ? (
        <div className="text-gray-500">No players found for this team.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {players.map((player) => (
            <div
              key={player.id}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group hover:shadow-2xl"
              style={{ minHeight: 260 }}
            >
              {/* Diagonal background split */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #f5faff 60%, #0a2e5d 60%)",
                  zIndex: 0,
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
                  src="/images/players/static-player.jpg"
                  alt="Player"
                  className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Player name */}
              <div className="relative z-30 pt-6 pl-4">
                <div className="text-lg font-semibold text-gray-900">{player.name}</div>
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
                className="absolute bottom-0 w-44px h-120px "
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