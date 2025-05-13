import { useParams, Link } from "react-router-dom";
import teamresultData from "../data/teamresultData.json";
import teamlistData from "../data/teamlistData.json";
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
  
  // Find the team name from teamlistData
  const team = teamlistData.list.find(t => t.teamId === teamId);
  const teamName = team ? team.teamName : `Team ${teamId}`;

  // Flatten all matches from all series - show all matches for any team
  const allMatches = teamresultData.teamMatchesData
    .filter((item) => item.matchDetailsMap)
    .flatMap((item) => item.matchDetailsMap.match);

  // Show all matches for any team since we have limited data
  const teamMatches = allMatches;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Link to="/teams" className="text-blue-600 hover:text-blue-800 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-green-900">
          {teamName} Matches
        </h1>
      </div>
      
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