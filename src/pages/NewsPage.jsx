import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { FiShare2 } from "react-icons/fi";
import newsListData from "../data/newslistData.json";
import { cricketTheme, cx } from "../theme/theme.jsx";

function NewsCard({ story, onClick }) {
  // Format date
  const date = story.pubTime
    ? new Date(Number(story.pubTime)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    : "";

  return (
    <div
      className={cx(
        cricketTheme.components.news.card,
        "flex flex-col h-full cursor-pointer transition-all duration-300"
      )}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        {story.coverImage && (
          <img
            src={"https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            alt={story.coverImage.caption || "Cricket news"}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
        )}
      </div>
      <div className={cx(
        cricketTheme.components.news.content,
        "flex-1 flex flex-col justify-between p-4"
      )}>
        <div>
          <h3 className={cx(
            cricketTheme.components.news.title,
            "line-clamp-2 mb-2"
          )} title={story.hline}>
            {story.hline}
          </h3>
          <p className={cx(
            cricketTheme.components.news.intro,
            "line-clamp-2 mb-3"
          )}>
            {story.intro}
          </p>
        </div>
        <div className={cx(
          cricketTheme.components.news.meta,
          "flex items-center justify-between pt-2 border-t border-slate-100"
        )}>
          <span>{story.source}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

function NewsPage() {
  const navigate = useNavigate();
  const allStories = newsListData.storyList?.filter(item => item.story) || [];
  const [visibleStories, setVisibleStories] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleStories(prev => Math.min(prev + 6, allStories.length));
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className={cx(
      "min-h-screen pt-20 pb-12",
      cricketTheme.background.main
    )}>
      <div className={cx(
        cricketTheme.layout.container,
        "py-8"
      )}>
        <div className="mb-12 text-center">
          <h1 className={cx(
            cricketTheme.typography.heading[1],
            "mb-3"
          )}>
            Cricket News & Updates
          </h1>
          <p className={cx(
            cricketTheme.typography.body.large,
            "max-w-2xl mx-auto"
          )}>
            Stay updated with the latest cricket news, match reports, player interviews and more from around the world.
          </p>
        </div>
        
        <div className="mb-10">
          <div className={cx(
            "p-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 max-w-xs mx-auto mb-8"
          )}>
            <div className="bg-white rounded-full px-4 py-2 text-center">
              <span className={cx(
                cricketTheme.typography.body.small,
                "font-medium text-violet-800"
              )}>
                Latest Stories
              </span>
            </div>
          </div>
        </div>
        
        <div className={cx(
          cricketTheme.layout.grid[3],
          "gap-8"
        )}>
          {allStories.slice(0, visibleStories).map(item => (
            <NewsCard
              key={item.story.id}
              story={item.story}
              onClick={() => navigate("/news-detail")}
            />
          ))}
        </div>
        
        {visibleStories < allStories.length && (
          <div className="mt-12 text-center">
            <button 
              className={cx(
                cricketTheme.components.button.primary,
                "px-8 py-3 rounded-full transition-all duration-300",
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-1"
              )}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Loading...
                </span>
              ) : (
                "Load More Stories"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsPage;