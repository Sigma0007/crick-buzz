import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import seriesnewsData from "../../data/seriesnewsData.json";
import { cricketTheme, cx } from "../../theme/theme.jsx";

function SeriesNewsPage() {
  const { seriesId } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [seriesContext, setSeriesContext] = useState('');

  useEffect(() => {
    setLoading(true);
    
    // Get news stories directly from seriesnewsData
    if (seriesnewsData?.storyList) {
      // Extract all news stories
      let seriesNews = seriesnewsData.storyList
        .filter(item => item.story && !item.ad)
        .map(item => item.story);
      
      // Sort by publication time, newest first
      seriesNews = seriesNews.sort((a, b) => Number(b.pubTime) - Number(a.pubTime));
      
      // Try to determine series context from the news data
      if (seriesNews.length > 0) {
        // Find the most common context in the news items
        const contextCounts = {};
        seriesNews.forEach(story => {
          if (story.context) {
            contextCounts[story.context] = (contextCounts[story.context] || 0) + 1;
          }
        });
        
        // Get the most common context
        let maxCount = 0;
        let mostCommonContext = '';
        for (const context in contextCounts) {
          if (contextCounts[context] > maxCount) {
            maxCount = contextCounts[context];
            mostCommonContext = context;
          }
        }
        
        setSeriesContext(mostCommonContext);
      }
      
      setNews(seriesNews);
      setLoading(false);
    }
  }, [seriesId]);

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
    return `https://th.bing.com/th?id=OIF.3Fcm4v1NUbXadax%2b2kt3QQ&w=295&h=184&c=7&r=0&o=5&pid=1.7`;
  };

  const getFallbackImageUrl = (type) => {
    const fallbacks = {
      'News': '/images/news-fallback.jpg',
      'Match Features': '/images/match-features-fallback.jpg',
      'default': '/images/cricket-fallback.jpg'
    };
    return fallbacks[type] || fallbacks.default;
  };

  const getNewsCategory = (type) => {
    const categories = {
      'News': cricketTheme.components.news.category.match,
      'Match Features': cricketTheme.components.news.category.player,
      'Reports': cricketTheme.components.news.category.team,
      'Previews': cricketTheme.components.news.category.tournament,
      'Live Blogs': cricketTheme.components.news.category.live,
      'default': cricketTheme.components.news.category.default
    };
    return categories[type] || categories.default;
  };

  // Get all unique story types for filter options
  const storyTypes = [...new Set(news.map(story => story.storyType))].filter(Boolean);

  const filteredNews = news.filter(story => {
    if (filter === 'all') return true;
    return story.storyType?.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className={cx(
      "min-h-screen pt-20 pb-12",
      cricketTheme.background.main
    )}>
      <div className={cx(
        "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      )}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <Link 
              to="/series" 
              className={cx(
                "mb-2 inline-flex items-center",
                cricketTheme.typography.body.small,
                "text-violet-600 hover:text-violet-800"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Series
            </Link>
            <h1 className={cricketTheme.typography.heading[2]}>Cricket News</h1>
            {seriesContext && (
              <p className={cx(
                cricketTheme.typography.body.medium,
                "text-slate-600 mt-1"
              )}>{seriesContext}</p>
            )}
          </div>

          <div className={cx(
            cricketTheme.components.card.root,
            "p-1"
          )}>
            <div className="flex gap-1">
              <button
                onClick={() => setFilter('all')}
                className={cx(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  filter === 'all'
                    ? 'bg-violet-100 text-violet-800'
                    : 'text-slate-600 hover:text-slate-900'
                )}
              >
                All
              </button>
              {storyTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={cx(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    filter === type.toLowerCase()
                      ? 'bg-violet-100 text-violet-800'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className={cx(
              "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-violet-500 border-r-transparent"
            )}></div>
            <p className={cx(
              "mt-4",
              cricketTheme.typography.body.medium
            )}>Loading news articles...</p>
          </div>
        ) : (
          <>
            {seriesContext && (
              <div className={cx(
                cricketTheme.components.card.root,
                "overflow-hidden mb-8"
              )}>
                <div className={cx(
                  "bg-gradient-to-r from-violet-600 to-violet-800",
                  "px-6 py-4"
                )}>
                  <h2 className="text-xl font-semibold text-white">{seriesContext}</h2>
                </div>
                <div className="p-4">
                  <div className={cx(
                    cricketTheme.typography.body.small,
                    "flex items-center"
                  )}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <span>{news.length} articles</span>
                    <span className="mx-2">•</span>
                    <span>Last updated: {formatDate(seriesnewsData.lastUpdatedTime)}</span>
                  </div>
                </div>
              </div>
            )}

            {filteredNews.length === 0 ? (
              <div className={cx(
                cricketTheme.components.card.root,
                "p-8 text-center"
              )}>
                <p className={cricketTheme.typography.body.medium}>
                  No {filter !== 'all' ? filter : ''} articles found.
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredNews.map((story, index) => (
                  <article
                    key={story.id}
                    className={cx(
                      index === 0 ? cricketTheme.components.news.featured : cricketTheme.components.news.card,
                      "transition-shadow hover:shadow-xl"
                    )}
                  >
                    {index === 0 ? (
                      <>
                        <div className={cricketTheme.components.news.featuredOverlay}></div>
                        <div className="absolute inset-0 overflow-hidden">
                          {(story.imageId || story.coverImage?.id) && (
                            <img
                              src={getImageUrl(story.imageId || story.coverImage?.id)}
                              alt={story.hline}
                              className="w-full h-full object-cover opacity-60"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = getFallbackImageUrl(story.storyType);
                              }}
                            />
                          )}
                        </div>
                        <div className={cricketTheme.components.news.featuredContent}>
                          <div className="flex items-center justify-between mb-4">
                            <span className={cx(
                              "inline-block px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded"
                            )}>
                              {story.storyType || 'News'}
                            </span>
                            <span className="text-sm text-white/80">{story.source}</span>
                          </div>
                          <h2 className="text-2xl font-bold text-white mb-3">
                            {story.hline}
                          </h2>
                          <p className="text-white/90 mb-4">{story.intro}</p>
                          <div className="flex items-center justify-between text-sm text-white/80">
                            <span>{formatDate(story.pubTime)}</span>
                            {story.context && (
                              <span>{story.context}</span>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <div className="relative h-48 md:h-full overflow-hidden">
                            {(story.imageId || story.coverImage?.id) && (
                              <img
                                src={getImageUrl(story.imageId || story.coverImage?.id)}
                                alt={story.hline}
                                className={cricketTheme.components.news.image}
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
                            <span className={cx(
                              "inline-block px-2 py-1 text-xs font-medium rounded",
                              getNewsCategory(story.storyType)
                            )}>
                              {story.storyType || 'News'}
                            </span>
                            <span className="text-sm text-slate-500">{story.source}</span>
                          </div>
                          <h2 className={cx(
                            cricketTheme.components.news.title,
                            "mb-2 line-clamp-2"
                          )}>
                            {story.hline}
                          </h2>
                          <p className={cx(
                            cricketTheme.typography.body.small,
                            "mb-4 line-clamp-2"
                          )}>{story.intro}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">{formatDate(story.pubTime)}</span>
                            {story.context && (
                              <span className="text-slate-400">{story.context}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {story.coverImage?.caption && (
                      <div className="px-6 py-3 bg-slate-50 text-sm text-slate-600 border-t">
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