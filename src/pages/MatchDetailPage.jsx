import { useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "../components/Popup";
import matchData from "../data/matchData.json";

const tabList = [
  { key: "summary", label: "Summary" },
  { key: "squads", label: "Squads" },
  { key: "awards", label: "Awards" },
];

function PlayerCard({ player }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg shadow hover:shadow-lg transition p-3 mb-2 border border-green-100">
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-lg">
        {player.name[0]}
      </div>
      <div>
        <div className="font-semibold text-green-900 flex items-center gap-2">
          {player.name}
          {player.captain && (
            <span className="text-xs bg-yellow-300 text-green-900 px-2 py-0.5 rounded">C</span>
          )}
          {player.keeper && (
            <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded">WK</span>
          )}
          {player.substitute && (
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">Sub</span>
          )}
        </div>
        <div className="text-xs text-gray-500 flex gap-2">
          {player.role && <span>{player.role}</span>}
          {player.battingStyle && <span>• {player.battingStyle}</span>}
          {player.bowlingStyle && <span>• {player.bowlingStyle}</span>}
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

  if (!info || !info.matchInfo) return <div className="p-8 text-center text-gray-500">No details found.</div>;

  const { matchInfo, venueInfo } = info;
  const team1 = matchInfo.team1;
  const team2 = matchInfo.team2;
  const series = matchInfo.series?.name || matchInfo.seriesName || "Series";
  const status = matchInfo.status || "";
  const startDate = matchInfo.startDate
    ? new Date(Number(matchInfo.startDate)).toLocaleString()
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
  // const teamLogo = (name) =>
  //   `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=34d399&color=fff&rounded=true&size=64`;

  return (
    <>
      {showLimitPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowLimitPopup(false)}
        />
      )}
      <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-0 overflow-hidden">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-700 to-green-900 p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-green-300 flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow-lg">
            {teamInitials(team1?.name)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-white mb-1">{series}</h2>
            <div className="text-xl font-bold text-yellow-300 flex items-center justify-center md:justify-start gap-2">
              {team1?.name}
              <span className="text-white">vs</span>
              {team2?.name}
              <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center text-xl font-bold text-white border-2 border-white shadow">
                {teamInitials(team2?.name)}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold animate-pulse ${status.includes('Live') ? 'bg-green-200 text-green-900' : 'bg-yellow-100 text-yellow-800'}`}>
                {status}
              </span>
              {result && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-green-900 border border-green-200">
                  {result}
                </span>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <img src={venueInfo?.imageUrl} alt={venueInfo?.ground} className="w-40 h-24 object-cover rounded shadow-lg border-2 border-white" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-green-200 bg-white">
          {tabList.map((t) => (
            <button
              key={t.key}
              className={`px-6 py-3 font-semibold transition-colors duration-200 ${
                tab === t.key
                  ? "border-b-4 border-green-700 text-green-900 bg-green-50"
                  : "text-gray-500 hover:text-green-700"
              }`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 bg-white">
          {tab === "summary" && (
            <>
              <div className="mb-4 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="font-semibold text-green-700 mb-1">Venue</div>
                  <div className="flex items-center gap-3">
                    <img src={venueInfo?.imageUrl} alt={venueInfo?.ground} className="w-24 h-16 object-cover rounded shadow border border-green-100" />
                    <div>
                      <div className="font-bold">{venueInfo?.ground} {venueInfo?.city}</div>
                      <div className="text-xs text-gray-500">{startDate}</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-green-700 mb-1">Toss</div>
                  <div>{toss}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="font-semibold text-green-700 mb-1">Match Description</div>
                <div className="text-gray-700">{matchInfo.matchDescription} ({matchInfo.matchFormat})</div>
              </div>
            </>
          )}

          {tab === "squads" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="font-bold text-green-800 mb-2">{team1?.name} Squad</div>
                {team1?.playerDetails?.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
              <div>
                <div className="font-bold text-green-800 mb-2">{team2?.name} Squad</div>
                {team2?.playerDetails?.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </div>
          )}

          {tab === "awards" && (
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <div className="font-semibold text-green-700 mb-1">Player of the Match</div>
                {matchInfo.playersOfTheMatch && matchInfo.playersOfTheMatch.length > 0 ? (
                  matchInfo.playersOfTheMatch.map((p) => (
                    <div key={p.id} className="flex items-center gap-2 bg-yellow-100 rounded px-2 py-1 mb-1">
                      <span className="font-bold">{p.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No data</div>
                )}
              </div>
              <div>
                <div className="font-semibold text-green-700 mb-1">Player of the Series</div>
                {matchInfo.playersOfTheSeries && matchInfo.playersOfTheSeries.length > 0 ? (
                  matchInfo.playersOfTheSeries.map((p) => (
                    <div key={p.id} className="flex items-center gap-2 bg-blue-100 rounded px-2 py-1 mb-1">
                      <span className="font-bold">{p.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No data</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MatchDetailPage;
