import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import seriesnewsData from "../../data/seriesnewsData.json";
import serieslistData from "../../data/serieslistData.json";

function SeriesNewsPage() {
  const { seriesId } = useParams();
  const [series, setSeries] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'news', 'features'

  useEffect(() => {
    setLoading(true);
    
    // Get series info from serieslistData
    if (serieslistData?.seriesMapProto) {
      for (const dateGroup of serieslistData.seriesMapProto) {
        const foundSeries = dateGroup.series.find(s => String(s.id) === String(seriesId));
        if (foundSeries) {
          setSeries(foundSeries);
          break;
        }
      }
    }

    // Get news stories for the series
    if (seriesnewsData?.storyList) {
      const seriesNews = seriesnewsData.storyList
        .filter(item => item.story && !item.ad)
        .map(item => item.story)
        .filter(story => {
          // Filter stories based on series context
          return story.context && story.context.includes(series?.name || 'tour');
        })
        .sort((a, b) => Number(b.pubTime) - Number(a.pubTime)); // Sort by publication time, newest first

      setNews(seriesNews);
      setLoading(false);
    }
  }, [seriesId, series?.name]);

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getImageUrl = (imageId) => {
    return `https://www.cricbuzz.com/a/img/v1/205x152/i1/c${imageId}/`;
  };

  const getFallbackImageUrl = (type) => {
    const fallbacks = {
      'News': '/images/news-fallback.jpg',
      'Match Features': '/images/match-features-fallback.jpg',
      'default': '/images/cricket-fallback.jpg'
    };
    return fallbacks[type] || fallbacks.default;
  };

  const filteredNews = news.filter(story => {
    if (filter === 'all') return true;
    return story.storyType?.toLowerCase() === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <Link to="/series" className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
              ← Back to Series List
            </Link>
            <h1 className="text-3xl font-bold text-green-900">Series News</h1>
          </div>

          <div className="flex gap-2 bg-white rounded-lg shadow p-1">
            <Link
              to="/series"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              All Series
            </Link>
            <Link
              to="/matches"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Matches
            </Link>
            <Link
              to={`/series/${seriesId}/news`}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-green-800 hover:text-green-900"
            >
              News
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading news articles...</p>
          </div>
        ) : !series ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Series Not Found</h2>
            <p className="text-gray-600 mb-4">The series you're looking for doesn't exist or has been removed.</p>
            <Link to="/series" className="text-blue-600 hover:text-blue-800">
              View All Series
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">{series.name}</h2>
              </div>
              <div className="p-4 flex flex-wrap gap-4 items-center justify-between">
                <div className="text-sm text-gray-600">
                  {formatDate(series.startDt)} - {formatDate(series.endDt)}
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/series/${series.id}`}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Series Details
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link
                    to={`/series/${series.id}/matches`}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    View Matches
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex justify-end mb-6">
              <div className="flex gap-2 bg-white rounded-lg shadow p-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('news')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    filter === 'news'
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  News
                </button>
                <button
                  onClick={() => setFilter('match features')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    filter === 'match features'
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Features
                </button>
              </div>
            </div>

            {filteredNews.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-600">No {filter !== 'all' ? filter : ''} articles found for this series.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredNews.map(story => (
                  <article
                    key={story.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <div className="relative h-48 md:h-full">
                          {(story.imageId || story.coverImage?.id) && (
                            <img
                              src={getImageUrl(story.imageId || story.coverImage?.id)}
                              alt={story.hline}
                              className="w-full h-full object-cover transition-opacity duration-200"
                              onError={(e) => {
                                e.target.onerror = null;
                                if (story.imageId && story.coverImage?.id && e.target.src === getImageUrl(story.imageId)) {
                                  e.target.src = getImageUrl(story.coverImage.id);
                                } else {
                                  e.target.src = getFallbackImageUrl(story.storyType);
                                  e.target.classList.add('opacity-75');
                                }
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            {story.storyType || 'News'}
                          </span>
                          <span className="text-sm text-gray-500">{story.source}</span>
                        </div>
                        <h2 className="text-xl font-semibold text-green-900 mb-2 line-clamp-2">
                          {story.hline}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-2">{story.intro}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{formatDate(story.pubTime)}</span>
                          {story.coverImage?.source && (
                            <span className="text-gray-400">Source: {story.coverImage.source}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {story.coverImage?.caption && (
                      <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600 border-t">
                        {story.coverImage.caption}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SeriesNewsPage;