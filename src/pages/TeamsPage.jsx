import { useState } from 'react';
import { Link } from 'react-router-dom';
import teamlistData from '../data/teamlistData.json';

function TeamsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Test Teams');

  // Group teams by category
  const teamsByCategory = teamlistData.list.reduce((acc, team) => {
    if (!team.teamId) {
      // This is a category header
      acc[team.teamName] = [];
    } else {
      // Find the last category
      const lastCategory = Object.keys(acc)[Object.keys(acc).length - 1];
      acc[lastCategory].push(team);
    }
    return acc;
  }, {});

  const categories = Object.keys(teamsByCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-900 mb-8">Cricket Teams</h1>
          
          {/* Category Tabs */}
          <div className="flex justify-center mb-8 overflow-x-auto">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                    ${selectedCategory === category
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamsByCategory[selectedCategory]?.map(team => (
              <div
                key={team.teamId}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    {/* Team Logo Placeholder - you can add actual team logos later */}
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-800">
                        {team.teamSName}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    {team.teamName}
                  </h3>
                  {team.countryName && (
                    <p className="text-sm text-gray-500 text-center">
                      {team.countryName}
                    </p>
                  )}
                </div>
                <div className="bg-gray-50 px-6 py-4">
                  <div className="flex justify-center space-x-4">
                    <Link
                      to={`/teams/${team.teamId}/players`}
                      className="text-sm font-medium text-green-600 hover:text-green-800"
                    >
                      Players
                    </Link>
                    <Link
                      to={`/teams/${team.teamId}/matches`}
                      className="text-sm font-medium text-green-600 hover:text-green-800"
                    >
                      Matches
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamsPage;
