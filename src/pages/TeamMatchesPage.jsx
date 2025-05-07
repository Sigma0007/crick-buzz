import { useParams } from "react-router-dom";
import teamresultData from "../data/teamresultData.json";
import ReactCountryFlag from "react-country-flag";

// 1. Map team short names to country codes
const teamSNameToCountryCode = {
  IND: "IN",
  AUS: "AU",
  NZ: "NZ",
  ENG: "GB",
  PAK: "PK",
  BAN: "BD",
  SA: "ZA",
  SL: "LK",
  AFG: "AF",
  WI: "JM", 
};

function TeamMatchesPage() {
  const { teamId } = useParams();

  // Flatten all matches from all series
  const allMatches = teamresultData.teamMatchesData
    .filter((item) => item.matchDetailsMap)
    .flatMap((item) => item.matchDetailsMap.match);

  // Filter matches where the team is either team1 or team2
  const teamMatches = allMatches.filter(
    (match) =>
      match.matchInfo.team1.teamId === Number(teamId) ||
      match.matchInfo.team2.teamId === Number(teamId)
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-green-900 mb-8 text-center">
        Matches for Team {teamId}
      </h1>
      {teamMatches.length === 0 ? (
        <div className="text-gray-500 text-center">No matches found for this team.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMatches.map((match) => (
            <div
              key={match.matchInfo.matchId}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-semibold">
                  {match.matchInfo.matchFormat}
                </span>
                <span className="text-xs text-[#FFA500]">{match.matchInfo.matchDesc}</span>
              </div>
              <div className="text-lg font-bold text-gray-800 mb-1">
                {match.matchInfo.seriesName}
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* Single circle with flag for team1 */}
                  {teamSNameToCountryCode[match.matchInfo.team1.teamSName] && (
                    <div className="w-15 h-10 bg-white flex items-center justify-center border-2 border-gray-700 shadow"
                         style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
                      <ReactCountryFlag
                        countryCode={teamSNameToCountryCode[match.matchInfo.team1.teamSName]}
                        svg
                        style={{
                          width: "58px",
                          height: "37px",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                  )}
                  <span className="font-bold text-lg text-gray-900">{match.matchInfo.team1.teamName}</span>
                </div>
                <span className="text-gray-600 font-semibold">vs</span>
                <div className="flex items-center gap-3">
                  {/* Single circle with flag for team2 */}
                  {teamSNameToCountryCode[match.matchInfo.team2.teamSName] && (
                    <div className="w-15 h-10 bg-white flex items-center justify-center border-2 border-gray-700 shadow "
                         style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}>
                      <ReactCountryFlag
                        countryCode={teamSNameToCountryCode[match.matchInfo.team2.teamSName]}
                        svg
                        style={{
                          width: "58px",
                          height: "37px",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                  )}
                  <span className="font-bold text-lg text-gray-900">{match.matchInfo.team2.teamName}</span>
                </div>
              </div>
              <div className="text-sm text-gray-900 mb-1">
                <span className="font-semibold">Status:</span> {match.matchInfo.status}
              </div>
              <div className="text-sm text-gray-900 mb-1">
                <span className="font-semibold">Venue:</span> {match.matchInfo.venueInfo.ground}, {match.matchInfo.venueInfo.city}
              </div>
              <div className="flex items-center justify-between text-sm font-semibold ">
                <span>
                  Date: {new Date(Number(match.matchInfo.startDate)).toLocaleDateString()}
                </span>
                {/* <span>
                  End: {new Date(Number(match.matchInfo.endDate)).toLocaleDateString()}
                </span> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamMatchesPage;