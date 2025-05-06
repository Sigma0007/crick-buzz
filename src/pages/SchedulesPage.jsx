import sedualData from "../data/sedualData.json";

// Helper function to format time from timestamp
const formatTime = (timestamp) => {
  if (!timestamp) return "N/A";
  return new Date(Number(timestamp)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

function SchedulesPage() {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <h2 className="text-3xl font-extrabold text-green-900 mb-8 text-center drop-shadow">Match Schedules</h2>
      {sedualData.matchScheduleMap && sedualData.matchScheduleMap.length > 0 ? (
        sedualData.matchScheduleMap.map((item, idx) => {
          // Check if the item is a schedule wrapper and not an ad
          if (!item.scheduleAdWrapper) {
            // Optionally render an ad placeholder or just skip
            // console.log("Skipping ad item:", item.adDetail?.name);
            return null;
          }

          const schedule = item.scheduleAdWrapper;

          return (
            <div key={idx} className="mb-10">
              {/* Date Header */}
              <div className="flex items-center mb-4">
                <span className="inline-block bg-green-200 text-green-900 font-bold px-4 py-1 rounded-full shadow text-sm">
                  {schedule.date}
                </span>
                <div className="flex-1 border-t border-green-200 ml-4"></div>
              </div>

              {/* Matches for the date */}
              <div className="space-y-6">
                {schedule.matchScheduleList.map((seriesData) => (
                  <div key={seriesData.seriesId} className="bg-white rounded-xl shadow p-4 border border-gray-100">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">{seriesData.seriesName}</h3>
                    <div className="space-y-3">
                      {seriesData.matchInfo.map((match) => (
                        <div key={match.matchId} className="border-t pt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{match.matchDesc} ({match.matchFormat})</span>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                              {formatTime(match.startDate)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-800 mb-1">
                            <span>{match.team1.teamSName} vs {match.team2.teamSName}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {match.venueInfo.ground}, {match.venueInfo.city}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No schedules found.</p>
      )}
    </div>
  );
}

export default SchedulesPage;
