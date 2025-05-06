import { useParams } from "react-router-dom";
import teamresultData from "../data/teamresultData.json";

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
                <span className="text-xs text-gray-400">{match.matchInfo.matchDesc}</span>
              </div>
              <div className="text-base font-semibold text-gray-800 mb-1">
                {match.matchInfo.seriesName}
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://cricketapi-platform.s3.ap-south-1.amazonaws.com/teams/${match.matchInfo.team1.imageId}.png`}
                    alt={match.matchInfo.team1.teamSName}
                    className="w-8 h-8 rounded-full bg-gray-100 object-contain border"
                  />
                  <span className="font-medium">{match.matchInfo.team1.teamName}</span>
                </div>
                <span className="text-gray-500 font-bold">vs</span>
                <div className="flex items-center gap-2">
                  <img
                    src={`https://cricketapi-platform.s3.ap-south-1.amazonaws.com/teams/${match.matchInfo.team2.imageId}.png`}
                    alt={match.matchInfo.team2.teamSName}
                    className="w-8 h-8 rounded-full bg-gray-100 object-contain border"
                  />
                  <span className="font-medium">{match.matchInfo.team2.teamName}</span>
                </div>
              </div>
              <div className="flex text-sm text-gray-600 mb-1">
                <span>
                  <span className="font-semibold">Status:</span> {match.matchInfo.status}
                </span>
                <span>
                  <span className="font-semibold">Venue:</span> {match.matchInfo.venueInfo.ground}, {match.matchInfo.venueInfo.city}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>
                  Start: {new Date(Number(match.matchInfo.startDate)).toLocaleDateString()}
                </span>
                <span>
                  End: {new Date(Number(match.matchInfo.endDate)).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamMatchesPage;