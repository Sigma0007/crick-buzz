import { Link } from "react-router-dom";

function MatchCard({ match }) {
  const info = match.matchInfo || {};
  const matchId = info.matchId;
  const team1 = info.team1?.teamName || 'Team 1';
  const team2 = info.team2?.teamName || 'Team 2';
  const series = info.seriesName || 'Series';
  const venue = info.venueInfo?.ground || '';
  const city = info.venueInfo?.city || '';
  const status = info.status || '';
  const startDate = info.startDate ? new Date(info.startDate).toLocaleString() : '';

  return (
    <Link to={`/match/${matchId}`} className="block hover:scale-105 transition-transform duration-200">
      <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl shadow-lg p-6 w-[320px] h-64 flex flex-col items-start mb-6 border border-indigo-200">
        <h2 className="text-xl font-semibold text-indigo-700 mb-2">{series}</h2>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-lg text-gray-800">{team1}</span>
          <span className="text-gray-500">vs</span>
          <span className="font-bold text-lg text-gray-800">{team2}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <svg className="w-4 h-4 mr-1 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z"></path>
          </svg>
          <span>{venue}{city && `, ${city}`}</span>
        </div>
        <div className={`mb-2 px-2 py-1 rounded text-xs font-medium ${status.includes('Live') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {status}
        </div>
        <div className="text-xs text-gray-500 mt-auto">
          {startDate}
        </div>
      </div>
    </Link>
  );
}

export default MatchCard;