import { Link } from 'react-router-dom';
import { cricketTheme, cx, getRandomGradient } from '../theme/theme.jsx';

function HomePage() {
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
                    <div className="w-44 h-44 rounded-full border-4 border-dashed border-red-300 animate-spin-slow"></div>
                  </div>
                </div>
                
                {/* Floating stats cards */}
                <div className="absolute top-4 left-0 transform -translate-x-1/4 animate-float-slow">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-indigo-100">
                    <div className="text-xs font-semibold text-indigo-800">LIVE MATCH</div>
                    <div className="text-sm mt-1">IND vs AUS</div>
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-0 transform translate-x-1/4 animate-float-slow-delayed">
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
              className={cx(
                "group p-6 rounded-xl transition-all duration-300",
                "bg-white hover:bg-gradient-to-br hover:from-white hover:to-indigo-50",
                "border border-slate-100 hover:border-indigo-200",
                "shadow-sm hover:shadow-md",
                cricketTheme.effects.scale
              )}
            >
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
            {/* News Card 1 */}
            <Link to="/news" className={cx(
              "rounded-xl overflow-hidden shadow-md bg-white border border-slate-100",
              "hover:shadow-lg transition-shadow duration-300 group"
            )}>
              <div className="h-48 bg-gradient-to-r from-violet-500 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-20 text-9xl font-bold">
                  NEWS
                </div>
              </div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mb-3">
                  Breaking News
                </span>
                <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-indigo-700 transition-colors">
                  India Announces Squad for Upcoming Series
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  The BCCI has announced a 15-member squad for the upcoming series against Australia.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">2 hours ago</span>
                  <span className="text-indigo-600 text-sm font-medium group-hover:text-indigo-800 transition-colors">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
            
            {/* News Card 2 */}
            <Link to="/news" className={cx(
              "rounded-xl overflow-hidden shadow-md bg-white border border-slate-100",
              "hover:shadow-lg transition-shadow duration-300 group"
            )}>
              <div className="h-48 bg-gradient-to-r from-cyan-500 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-20 text-9xl font-bold">
                  LIVE
                </div>
              </div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mb-3">
                  Match Update
                </span>
                <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-indigo-700 transition-colors">
                  England vs New Zealand: 3rd Test Day 2
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  England leads by 45 runs with 7 wickets remaining in the first innings.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Live</span>
                  <span className="text-indigo-600 text-sm font-medium group-hover:text-indigo-800 transition-colors">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
            
            {/* News Card 3 */}
            <Link to="/news" className={cx(
              "rounded-xl overflow-hidden shadow-md bg-white border border-slate-100",
              "hover:shadow-lg transition-shadow duration-300 group"
            )}>
              <div className="h-48 bg-gradient-to-r from-amber-500 to-orange-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-20 text-9xl font-bold">
                  STATS
                </div>
              </div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-800 mb-3">
                  Player Stats
                </span>
                <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-indigo-700 transition-colors">
                  Top 10 Batsmen in T20 Cricket
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Check out the latest ICC rankings for T20 batsmen and their performance stats.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Updated Today</span>
                  <span className="text-indigo-600 text-sm font-medium group-hover:text-indigo-800 transition-colors">
                    View Rankings →
                  </span>
                </div>
              </div>
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
      
      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(-25%); }
          50% { transform: translateY(-10px) translateX(-25%); }
        }
        @keyframes float-slow-delayed {
          0%, 100% { transform: translateY(0) translateX(25%); }
          50% { transform: translateY(-10px) translateX(25%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        .animate-float-slow-delayed {
          animation: float-slow-delayed 5s ease-in-out infinite;
          animation-delay: 2.5s;
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default HomePage;
