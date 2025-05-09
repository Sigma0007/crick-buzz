import { Link } from "react-router-dom";

function MatchCard({ match }) {
  const info = match.matchInfo || {};
  const matchId = info.matchId;
  const matchDesc = info.matchDesc || '';
  const team1 = info.team1?.teamName || 'Team 1';
  const team2 = info.team2?.teamName || 'Team 2';
  const team1Score = match.matchScore?.team1Score || {};
  const team2Score = match.matchScore?.team2Score || {};
  const venue = info.venueInfo?.ground || '';
  const city = info.venueInfo?.city || '';
  const status = info.status || '';
  
  // Format date properly
  const startDate = info.startDate 
    ? new Date(parseInt(info.startDate))
    : null;
  
  const formattedDate = startDate ? 
    `MAR, Fri ${startDate.getDate()} ${startDate.getHours()}:${String(startDate.getMinutes()).padStart(2, '0')} AM IST` 
    : 'Invalid Date';
  
  // Get team abbreviations (first 3 letters)
  const getTeamAbbr = (teamName) => {
    return teamName.substring(0, 3);
  };
  
  // Get team color based on team name
  const getTeamColor = (teamName) => {
    const teamColors = {
      'India': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
      'Australia': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
      'England': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
      'New Zealand': { bg: 'bg-black', text: 'text-white', border: 'border-gray-600' },
      'South Africa': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
      'West Indies': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
      'Pakistan': { bg: 'bg-green-600', text: 'text-white', border: 'border-green-700' },
      'Sri Lanka': { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-600' },
      'Bangladesh': { bg: 'bg-green-500', text: 'text-white', border: 'border-green-600' },
      'Afghanistan': { bg: 'bg-blue-600', text: 'text-white', border: 'border-blue-700' },
      'Zimbabwe': { bg: 'bg-red-500', text: 'text-white', border: 'border-red-600' },
      'Ireland': { bg: 'bg-green-200', text: 'text-green-800', border: 'border-green-300' },
      'Malaysia': { bg: 'bg-yellow-500', text: 'text-blue-900', border: 'border-yellow-600' },
      'Singapore': { bg: 'bg-red-600', text: 'text-white', border: 'border-red-700' },
      'Thailand': { bg: 'bg-blue-200', text: 'text-blue-800', border: 'border-blue-300' },
      'Saudi Arabia': { bg: 'bg-green-700', text: 'text-white', border: 'border-green-800' },
    };
    
    // Default color if team not found
    const defaultColor = { bg: 'bg-gray-200', text: 'text-gray-800', border: 'border-gray-300' };
    
    // Find the team by checking if the teamName includes any of the keys
    for (const [key, value] of Object.entries(teamColors)) {
      if (teamName.includes(key)) {
        return value;
      }
    }
    
    return defaultColor;
  };
  
  const team1Color = getTeamColor(team1);
  const team2Color = getTeamColor(team2);
  
  // Get match status tag style
  const getMatchTagStyle = () => {
    if (matchDesc.includes('Final')) {
      return {
        bg: 'bg-green-100',
        border: 'border-green-600',
        text: 'text-green-700',
        label: 'MATCH Final'
      };
    } else if (matchDesc.includes('place')) {
      return {
        bg: 'bg-blue-100',
        border: 'border-blue-600',
        text: 'text-blue-700',
        label: `MATCH ${matchDesc}`
      };
    } else {
      return {
        bg: 'bg-purple-100',
        border: 'border-purple-600',
        text: 'text-purple-700',
        label: `MATCH ${matchDesc}`
      };
    }
  };
  
  const tagStyle = getMatchTagStyle();
  
  // Extract winner information
  const getWinnerInfo = () => {
    if (!status || !status.includes('won')) return null;
    
    const winnerTeam = status.includes(team1) ? team1 : team2;
    const winMargin = status.match(/by (\d+) (runs|wickets)/);
    
    if (winMargin) {
      return {
        team: winnerTeam,
        margin: winMargin[1],
        type: winMargin[2]
      };
    }
    return { team: winnerTeam };
  };
  
  const winnerInfo = getWinnerInfo();
  const winnerColor = winnerInfo && winnerInfo.team ? 
    (winnerInfo.team === team1 ? team1Color.text : team2Color.text) : '';

  return (
    <div className="w-full border-b border-gray-200 py-4 px-4 hover:bg-gray-50 transition-colors rounded-lg shadow-sm hover:shadow-md my-2">
      {/* Match tag and venue info */}
      <div className="mb-3">
        <div className={`inline-block ${tagStyle.bg} ${tagStyle.border} ${tagStyle.text} px-3 py-1 text-xs font-medium rounded-full mb-2 border`}>
          {tagStyle.label}
        </div>
        <div className="text-sm font-medium text-gray-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a1.5 1.5 0 10-2.121 2.121l4.243 4.243a1 1 0 001.414-1.414zM10 20a10 10 0 1110-10 10.011 10.011 0 01-10 10z" />
          </svg>
          {venue}, {city}
        </div>
        <div className="text-xs text-gray-500 flex items-center mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formattedDate}
        </div>
      </div>
      
      {/* Winner display */}
      {winnerInfo && winnerInfo.team && (
        <div className={`mb-3 font-bold text-sm py-1 px-3 rounded-lg inline-block ${winnerColor} bg-gray-200`}>
          {winnerInfo.team.toUpperCase()} WON BY {winnerInfo.margin || 0} {(winnerInfo.type || 'runs').toUpperCase()}
        </div>
      )}
      
      {/* Teams and scores */}
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-100">
        {/* Team 1 */}
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${team1Color.bg} ${team1Color.border} rounded-full flex items-center justify-center text-sm font-bold ${team1Color.text} border-2 shadow-sm`}>
            {getTeamAbbr(team1)}
          </div>
          <div>
            <div className="text-sm font-medium">{team1}</div>
            <div className="font-bold text-lg">
              {team1Score.inngs1 ? `${team1Score.inngs1.runs}/${team1Score.inngs1.wickets}` : ''}
              <span className="text-xs text-gray-500 ml-1">
                {team1Score.inngs1?.overs ? `(${team1Score.inngs1.overs})` : ''}
              </span>
            </div>
          </div>
        </div>
        
        {/* VS */}
        <div className="text-gray-400 text-sm px-2 font-medium bg-gray-100 py-1 rounded-full">VS</div>
        
        {/* Team 2 */}
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${team2Color.bg} ${team2Color.border} rounded-full flex items-center justify-center text-sm font-bold ${team2Color.text} border-2 shadow-sm`}>
            {getTeamAbbr(team2)}
          </div>
          <div>
            <div className="text-sm font-medium">{team2}</div>
            <div className="font-bold text-lg">
              {team2Score.inngs1 ? `${team2Score.inngs1.runs}/${team2Score.inngs1.wickets}` : ''}
              <span className="text-xs text-gray-500 ml-1">
                {team2Score.inngs1?.overs ? `(${team2Score.inngs1.overs})` : ''}
              </span>
            </div>
          </div>
        </div>
        
        {/* Match Centre button */}
        <Link 
          to={`/match/${matchId}`} 
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-sm hover:shadow flex items-center"
        >
          <span>Match Centre</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default MatchCard;