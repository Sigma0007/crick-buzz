import { Link, useNavigate } from 'react-router-dom';
import { cricketTheme, cx, getRandomGradient } from '../theme/theme.jsx';
import newsListData from "../data/newslistData.json";

// Import the NewsCard component
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
        "bg-white rounded-xl overflow-hidden shadow-md border border-slate-100",
        "hover:shadow-lg transition-all duration-300 group",
        "flex flex-col h-full cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        {story.coverImage ? (
          <img
            src={"https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            alt={story.coverImage.caption || "Cricket news"}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="h-48 bg-gradient-to-r from-violet-500 to-indigo-600 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-20 text-9xl font-bold">
              NEWS
            </div>
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mb-3">
            {story.context || "Cricket News"}
          </span>
          <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-2" title={story.hline}>
            {story.hline}
          </h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {story.intro}
          </p>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-500">{story.source || "Cricket News"}</span>
          <span className="text-indigo-600 text-sm font-medium group-hover:text-indigo-800 transition-colors">
            Read More →
          </span>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const featuredSections = [
    {
      title: "Live Matches",
      description: "Follow ball-by-ball updates of ongoing cricket matches",
      icon: "🏏",
      link: "/matches",
      gradient: cricketTheme.colors.gradients.sunset
    },
    {
      title: "Match Schedules",
      description: "Stay updated with upcoming cricket fixtures",
      icon: "📅",
      link: "/schedules",
      gradient: cricketTheme.colors.gradients.ocean
    },
    {
      title: "Teams",
      description: "Explore cricket teams from around the world",
      icon: "👥",
      link: "/teams",
      gradient: cricketTheme.colors.gradients.forest
    },
    {
      title: "Players",
      description: "Discover profiles and stats of cricket players",
      icon: "🏆",
      link: "/players",
      gradient: cricketTheme.colors.gradients.berry
    }
  ];

  // Get top 3 news stories from the data
  const topStories = newsListData.storyList?.filter(item => item.story).slice(0, 3) || [];

  // If we don't have enough stories, add placeholders
  const placeholderStories = [
    {
      story: {
        id: "placeholder1",
        hline: "India Announces Squad for Upcoming Series",
        intro: "The BCCI has announced a 15-member squad for the upcoming series against Australia.",
        context: "Breaking News",
        source: "Cricket News",
        pubTime: Date.now().toString()
      }
    },
    {
      story: {
        id: "placeholder2",
        hline: "England vs New Zealand: 3rd Test Day 2",
        intro: "England leads by 45 runs with 7 wickets remaining in the first innings.",
        context: "Match Update",
        source: "Live Updates",
        pubTime: Date.now().toString()
      }
    },
    {
      story: {
        id: "placeholder3",
        hline: "Top 10 Batsmen in T20 Cricket",
        intro: "Check out the latest ICC rankings for T20 batsmen and their performance stats.",
        context: "Player Stats",
        source: "Cricket Stats",
        pubTime: Date.now().toString()
      }
    }
  ];

  // Combine real stories with placeholders if needed
  const displayStories = topStories.length === 3 ? topStories : 
    [...topStories, ...placeholderStories.slice(topStories.length)].slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-3xl"></div>

        <div className={cx(cricketTheme.layout.container, "py-16 relative z-10")}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-indigo-800">
                  Cricket Hub
                </span>
              </h1>
              <p className={cx(cricketTheme.typography.body.large, "mb-8 max-w-xl")}>
                Your ultimate destination for live cricket scores, match schedules, player stats, and everything cricket!
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link to="/matches" className={cx(
                  "px-6 py-3 rounded-full font-medium transition-all duration-300",
                  "bg-gradient-to-r from-violet-600 to-indigo-700 text-white shadow-lg",
                  "hover:shadow-violet-500/30 hover:shadow-xl"
                )}>
                  Matches
                </Link>
                <Link to="/schedules" className={cx(
                  "px-6 py-3 rounded-full font-medium transition-all duration-300",
                  "bg-white text-violet-700 border border-violet-200 shadow-sm",
                  "hover:bg-violet-50 hover:border-violet-300"
                )}>
                  View Schedules
                </Link>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Cricket ball graphic */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-xl flex items-center justify-center">
                    <div className={cx("w-44 h-44 rounded-full border-4 border-dashed border-red-300", cricketTheme.effects.animations.spinSlow)}></div>
                  </div>
                </div>

                {/* Floating stats cards */}
                <div className={cx("absolute top-4 left-0 transform -translate-x-1/4", cricketTheme.effects.animations.floatSlow)}>
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-indigo-100">
                    <div className="text-xs font-semibold text-indigo-800">MATCH</div>
                    <div className="text-sm mt-1">IND vs AUS</div>
                  </div>
                </div>

                <div className={cx("absolute bottom-8 right-0 transform translate-x-1/4", cricketTheme.effects.animations.floatSlowDelayed)}>
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-indigo-100">
                    <div className="text-xs font-semibold text-indigo-800">TOP PLAYER</div>
                    <div className="text-sm mt-1">V. Kohli</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className={cx(cricketTheme.layout.container, "py-16")}>
        <h2 className={cx(cricketTheme.typography.heading[2], "text-center mb-12")}>
          Explore Cricket World
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSections.map((section, index) => (
            <Link
              key={index}
              to={section.link}

              //common card for Explore Cricket World
              
              className={cx(
                "group p-6 rounded-xl transition-all duration-300",
                "bg-white hover:bg-gradient-to-br hover:from-white hover:to-indigo-50",
                "border border-slate-100 hover:border-indigo-200",
                "shadow-sm hover:shadow-md",
                cricketTheme.effects.scale
              )}
            >
              {/* icon */}
              <div className={cx(
                "w-12 h-12 mb-4 rounded-full flex items-center justify-center text-xl",
                "bg-gradient-to-br text-white shadow-md",
                section.gradient
              )}>
                {section.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">
                {section.title}
              </h3>
              <p className="text-slate-600 text-sm">
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-violet-50">
        <div className={cricketTheme.layout.container}>
          <h2 className={cx(cricketTheme.typography.heading[2], "text-center mb-12")}>
            Latest Cricket Updates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayStories.map((item, index) => (
              <NewsCard
                key={item.story.id || `placeholder-${index}`}
                story={item.story}
                onClick={() => navigate("/news-detail", { state: { storyId: item.story.id } })}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              to="/news"
              className={cx(
                "inline-block px-6 py-3 rounded-full font-medium",
                "bg-white text-indigo-700 border border-indigo-200 shadow-sm",
                "hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300"
              )}
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className={cx(cricketTheme.layout.container, "text-center")}>
          <div className={cx(
            "p-10 rounded-2xl relative overflow-hidden",
            "bg-gradient-to-r from-violet-600 to-indigo-700",
            cricketTheme.effects.glow
          )}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

            <h2 className="text-3xl font-bold text-white mb-4 relative z-10">
              Never Miss a Cricket Match Again!
            </h2>
            <p className="text-indigo-100 max-w-2xl mx-auto mb-8 relative z-10">
              Stay updated with live scores, match schedules, and player statistics from around the cricket world.
            </p>
            <Link to="/schedules" className={cx(
              "inline-block px-8 py-4 rounded-full font-medium text-indigo-700 bg-white shadow-lg",
              "hover:bg-indigo-50 transition-all duration-300 relative z-10"
            )}>
              View Upcoming Matches
            </Link>
          </div>
        </div>
      </section>

      {/* Add animation keyframes */}
      <style jsx>{cricketTheme.effects.keyframes}</style>
    </div>
  );
}

export default HomePage;
