import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import newsDetailData from "../data/newsdetailData.json";
import { cricketTheme, cx } from "../theme/theme.jsx";

function NewsDetailPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className={cx(
        "min-h-screen pt-20 pb-12 flex items-center justify-center",
        cricketTheme.background.main
      )}>
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Format date
  const date = newsDetailData.pubTime
    ? new Date(Number(newsDetailData.pubTime)).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
    : "";

  return (
    <div className={cx(
      "min-h-screen pt-20 pb-12",
      cricketTheme.background.main
    )}>
      <div className={cx(
        cricketTheme.layout.container,
        "py-8"
      )}>
        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-slate-500">
            <Link to="/" className="hover:text-violet-700 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/news" className="hover:text-violet-700 transition-colors">News</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-700">Article</span>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Category badge */}
          <div className="mb-4">
            <span className={cx(
              cricketTheme.components.badge.primary,
              "uppercase tracking-wider"
            )}>
              {newsDetailData.context || "Cricket News"}
            </span>
          </div>
          
          {/* Headline */}
          <h1 className={cx(
            cricketTheme.typography.heading[1],
            "mb-4"
          )}>
            {newsDetailData.headline}
          </h1>
          
          {/* Meta information */}
          <div className="flex items-center justify-between mb-6 text-sm text-slate-500">
            <div className="flex items-center">
              <span className="mr-4">{date}</span>
              <span>Source: {newsDetailData.source}</span>
            </div>
            
            {/* Share buttons */}
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Cover image */}
          {newsDetailData.coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <img
                src={"https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                alt={newsDetailData.coverImage.caption}
                className="w-full h-96 object-cover"
              />
              {newsDetailData.coverImage.caption && (
                <div className="bg-slate-800 bg-opacity-80 text-white p-3 text-sm">
                  {newsDetailData.coverImage.caption}
                </div>
              )}
            </div>
          )}
          
          {/* Article content */}
          <div className={cx(
            "bg-white rounded-2xl shadow-md p-8 mb-8",
            "border border-slate-100"
          )}>
            {/* Introduction */}
            <div className={cx(
              cricketTheme.typography.body.large,
              "font-medium text-slate-700 mb-6 border-l-4 border-violet-500 pl-4 py-2"
            )}>
              {newsDetailData.intro}
            </div>
            
            {/* Main content */}
            <div className={cx(
              cricketTheme.typography.body.medium,
              "text-slate-700 space-y-6"
            )}>
              {newsDetailData.content
                ?.filter(item => item.content)
                .map((item, idx) => (
                  <p key={idx}>{item.content.contentValue}</p>
                ))}
            </div>
          </div>
          
          {/* Related articles */}
          <div className="mb-8">
            <h3 className={cx(
              cricketTheme.typography.heading[3],
              "mb-4"
            )}>
              Related Articles
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div 
                  key={item} 
                  className={cx(
                    cricketTheme.components.news.card,
                    "cursor-pointer"
                  )}
                  onClick={() => navigate("/news-detail")}
                >
                  <div className="h-40 bg-gradient-to-r from-violet-500 to-indigo-600 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-20 text-6xl font-bold">
                      NEWS
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className={cx(
                      cricketTheme.components.news.title,
                      "line-clamp-2 mb-2"
                    )}>
                      Another Cricket News Headline Here
                    </h4>
                    <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
                      <span>2 hours ago</span>
                      <span>ESPN Cricinfo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Back to news button */}
          <div className="text-center">
            <Link 
              to="/news" 
              className={cx(
                cricketTheme.components.button.outline,
                "inline-flex items-center"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetailPage;