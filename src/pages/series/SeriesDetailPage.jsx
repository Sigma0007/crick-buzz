import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import serieslistData from "../../data/serieslistData.json";
import seriesmatchesData from "../../data/seriesmatchesData.json";
import { cricketTheme, cx, getSeriesFormatColor } from "../../theme/theme.jsx";

function SeriesDetailPage() {
  const { seriesId } = useParams();
  const [series, setSeries] = useState(null);
  const [matchCount, setMatchCount] = useState(0);
  const [format, setFormat] = useState(null);
  const [latestMatch, setLatestMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find series in serieslistData
    if (serieslistData?.seriesMapProto) {
      for (const dateGroup of serieslistData.seriesMapProto) {
        const foundSeries = dateGroup.series.find(s => String(s.id) === String(seriesId));
        if (foundSeries) {
          setSeries(foundSeries);
          break;
        }
      }
    }

    // Get additional info from matches data
    if (seriesmatchesData?.matchDetails) {
      let count = 0;
      let lastMatch = null;
      let matchFormat = null;

      seriesmatchesData.matchDetails.forEach(detail => {
        if (detail?.matchDetailsMap?.match) {
          detail.matchDetailsMap.match.forEach(match => {
            if (String(match?.matchInfo?.seriesId) === String(seriesId)) {
              count++;
              if (!matchFormat) {
                matchFormat = match.matchInfo.matchFormat;
              }
              if (!lastMatch || Number(match.matchInfo.startDate) > Number(lastMatch.matchInfo.startDate)) {
                lastMatch = match;
              }
            }
          });
        }
      });

      setMatchCount(count);
      setFormat(matchFormat);
      setLatestMatch(lastMatch);
    }

    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [seriesId]);

  if (loading) {
    return (
      <div className={cx(
        "min-h-screen pt-20  flex items-center justify-center",
        cricketTheme.background.main
      )}>
        <div className={cricketTheme.components.loader.spinner}></div>
      </div>
    );
  }

  if (!series) {
    return (
      <div className={cx(
        "min-h-screen  ",
        cricketTheme.background.main
      )}>
        <div className={cx(
          cricketTheme.layout.container,
          "py-8"
        )}>
          <div className="text-center py-12">
            <h2 className={cricketTheme.typography.heading[2]}>Series Not Found</h2>
            <p className={cx(
              cricketTheme.typography.body.medium,
              "mt-4"
            )}>
              The series you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/series"
              className={cx(
                cricketTheme.components.button.primary,
                "mt-6 inline-block"
              )}
            >
              Back to Series
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format dates
  const startDate = new Date(Number(series.startDate));
  const endDate = new Date(Number(series.endDate));
  const formattedStartDate = startDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const formattedEndDate = endDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className={cx(
      "min-h-screen ",
      cricketTheme.background.main
    )}>
      <div className={cx(
        cricketTheme.layout.container,
        "py-8"
      )}>
        {/* Series Header */}
        <div className={cx(
          "relative overflow-hidden rounded-xl mb-8",
          "bg-gradient-to-r",
          getSeriesFormatColor(format || series.name)
        )}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{series.name}</h1>
                <p className="text-white/80">
                  {formattedStartDate} - {formattedEndDate}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className={cx(
                  cricketTheme.components.badge.glass,
                  "uppercase"
                )}>
                  {format || "Series"}
                </span>
                <span className={cricketTheme.components.badge.glass}>
                  {matchCount} {matchCount === 1 ? "Match" : "Matches"}
                </span>
              </div>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className={cx(
              cricketTheme.components.card.root,
              "mb-8"
            )}>
              <div className={cricketTheme.components.card.header}>
                <h2 className={cricketTheme.typography.heading[4]}>About this Series</h2>
              </div>
              <div className={cricketTheme.components.card.body}>
                <p className={cricketTheme.typography.body.medium}>
                  {series.name} is a {format?.toLowerCase() || "cricket"} series featuring top teams competing for the championship.
                  The tournament runs from {formattedStartDate} to {formattedEndDate}.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">Format</h3>
                    <p className="text-slate-900">{format || "Multiple Formats"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">Total Matches</h3>
                    <p className="text-slate-900">{matchCount}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">Start Date</h3>
                    <p className="text-slate-900">{formattedStartDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">End Date</h3>
                    <p className="text-slate-900">{formattedEndDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {latestMatch && (
              <div className={cx(
                cricketTheme.components.card.root,
                "mb-8"
              )}>
                <div className={cricketTheme.components.card.header}>
                  <h2 className={cricketTheme.typography.heading[4]}>Latest Match</h2>
                </div>
                <div className={cricketTheme.components.card.body}>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="font-bold">{latestMatch.matchInfo.team1.teamName}</div>
                      <div className="text-sm text-slate-500">
                        {latestMatch.matchScore?.team1Score?.inngs1?.runs || '-'}/
                        {latestMatch.matchScore?.team1Score?.inngs1?.wickets || '-'}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-medium text-slate-500 mb-1">
                        {new Date(Number(latestMatch.matchInfo.startDate)).toLocaleDateString()}
                      </div>
                      <div className={cx(
                        cricketTheme.components.badge.primary,
                        "uppercase"
                      )}>
                        {latestMatch.matchInfo.matchFormat}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-bold">{latestMatch.matchInfo.team2.teamName}</div>
                      <div className="text-sm text-slate-500">
                        {latestMatch.matchScore?.team2Score?.inngs1?.runs || '-'}/
                        {latestMatch.matchScore?.team2Score?.inngs1?.wickets || '-'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <div className="text-sm font-medium">
                      {latestMatch.matchInfo.status}
                    </div>
                    <Link
                      to={`/matches/${latestMatch.matchInfo.matchId}`}
                      className={cx(
                        cricketTheme.components.button.outline,
                        "mt-3 text-sm"
                      )}
                    >
                      View Match Details
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className={cx(
              cricketTheme.components.card.root,
              "mb-8"
            )}>
              <div className={cricketTheme.components.card.header}>
                <h2 className={cricketTheme.typography.heading[4]}>Quick Links</h2>
              </div>
              <div className={cricketTheme.components.card.body}>
                <nav className="flex flex-col space-y-2">
                  <Link
                    to={`/series/${seriesId}/matches`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-medium text-slate-700">Matches</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    to={`/series/${seriesId}/news`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-medium text-slate-700">News & Articles</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeriesDetailPage;