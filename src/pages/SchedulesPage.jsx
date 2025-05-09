import sedualData from "../data/sedualData.json";
import { cricketTheme, cx, getSeriesFormatColor, formatDateString } from "../theme/theme";

// Helper function to format time from timestamp
const formatTime = (timestamp) => {
  if (!timestamp) return "N/A";
  return new Date(Number(timestamp)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

function SchedulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-sky-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with decorative elements */}
        <div className="relative mb-12 text-center">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -top-4 left-1/3 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute top-0 right-1/3 transform translate-x-1/2 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-xl"></div>
          
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-indigo-800 inline-block relative z-10">
            Match Schedules
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-2 rounded-full"></div>
          <p className="mt-3 text-indigo-600 max-w-2xl mx-auto">
            Stay updated with upcoming cricket matches from around the world
          </p>
        </div>
        
        {sedualData.matchScheduleMap && sedualData.matchScheduleMap.length > 0 ? (
          sedualData.matchScheduleMap.map((item, idx) => {
            // Check if the item is a schedule wrapper and not an ad
            if (!item.scheduleAdWrapper) {
              return null;
            }

            const schedule = item.scheduleAdWrapper;
            const formattedDate = formatDateString(schedule.date);

            return (
              <div key={idx} className="mb-14">
                {/* Date Header with interesting design */}
                <div className="flex items-center mb-6 relative">
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-full opacity-20 blur-md"></div>
                  <div className={cx(
                    "inline-block px-6 py-2 rounded-full shadow-lg",
                    "bg-gradient-to-r from-violet-600 to-indigo-700 text-white font-bold",
                    "transform -rotate-1 relative z-10",
                    cricketTheme.effects.glow
                  )}>
                    <span className="text-sm tracking-wider uppercase">{formattedDate}</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-violet-300 to-indigo-300 ml-4"></div>
                </div>

                {/* Matches for the date */}
                <div className="space-y-6">
                  {schedule.matchScheduleList.map((seriesData) => {
                    const seriesFormat = seriesData.matchInfo[0]?.matchFormat || "";
                    const seriesColor = getSeriesFormatColor(seriesFormat);
                    
                    return (
                      <div key={seriesData.seriesId} className={cx(
                        "overflow-hidden rounded-xl shadow-lg",
                        "border border-white/50 backdrop-filter backdrop-blur-sm",
                        "bg-white/70 hover:bg-white/80 transition-all duration-300",
                        cricketTheme.effects.scale
                      )}>
                        <div className={cx(
                          "p-4 relative overflow-hidden",
                          `bg-gradient-to-r ${seriesColor} text-white`
                        )}>
                          {/* Decorative circles */}
                          <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full"></div>
                          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full"></div>
                          <div className="absolute left-1/2 -bottom-6 w-12 h-12 bg-white/10 rounded-full"></div>
                          
                          <h3 className="text-lg font-bold relative z-10 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            {seriesData.seriesName}
                          </h3>
                          <span className="inline-block bg-white/20 text-white text-xs font-medium px-2 py-0.5 rounded-full mt-1 backdrop-blur-sm">
                            {seriesFormat}
                          </span>
                        </div>
                        
                        <div className="divide-y divide-indigo-100">
                          {seriesData.matchInfo.map((match) => {
                            const matchTime = formatTime(match.startDate);
                            
                            return (
                              <div key={match.matchId} className="p-4 hover:bg-indigo-50/50 transition-colors">
                                <div className="flex justify-between items-center mb-3">
                                  <span className="font-medium text-indigo-900">
                                    {match.matchDesc}
                                  </span>
                                  <span className={cx(
                                    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                                    "bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-800 shadow-sm"
                                  )}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {matchTime}
                                  </span>
                                </div>
                                
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className={cx(
                                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md",
                                      `bg-gradient-to-br ${seriesColor}`
                                    )}>
                                      {match.team1.teamSName}
                                    </div>
                                    <span className="font-medium text-slate-700">{match.team1.teamName}</span>
                                  </div>
                                  
                                  <div className="px-4">
                                    <span className="inline-block bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-bold">
                                      VS
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center gap-3 flex-1 justify-end">
                                    <span className="font-medium text-slate-700">{match.team2.teamName}</span>
                                    <div className={cx(
                                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md",
                                      `bg-gradient-to-br ${seriesColor}`
                                    )}>
                                      {match.team2.teamSName}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                                  <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {match.venueInfo.ground}, {match.venueInfo.city}
                                  </div>
                                  
                                  <span className={cx(
                                    "inline-block px-2 py-0.5 rounded text-xs font-medium",
                                    "bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-800"
                                  )}>
                                    {match.matchFormat}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className={cx(
            "text-center p-12 rounded-xl backdrop-blur-md border border-white/50 shadow-xl",
            "bg-gradient-to-br from-white/40 to-white/70"
          )}>
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-violet-200 rounded-full animate-ping opacity-25"></div>
              <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-violet-900 mb-2">No Matches Scheduled</h3>
            <p className="text-indigo-700 max-w-md mx-auto">
              There are no upcoming cricket matches scheduled at the moment. Check back later for updates.
            </p>
            <button className={cx(
              "mt-6 px-6 py-2 rounded-full shadow-lg",
              "bg-gradient-to-r from-violet-600 to-indigo-700 text-white font-medium",
              "hover:shadow-violet-500/30 hover:shadow-xl transition-all duration-300"
            )}>
              Refresh Schedule
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SchedulesPage;
