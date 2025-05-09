import { useState } from 'react';
import { Link } from 'react-router-dom';
import teamlistData from '../data/teamlistData.json';
import ReactCountryFlag from 'react-country-flag';

// Map team short names to country codes
const teamSNameToCountryCode = {
  IND: "IN",
  AUS: "AU",
  NZ: "NZ",
  ENG: "GB",
  PAK: "PK",
  BAN: "BD",
  SA: "ZA",
  SL: "LK",
  AFG: "AF",
  WI: "JM",
  IRE: "IE",
  ZIM: "ZW",
  RSA: "ZA",
  NEP: "NP",
  SCO: "GB",
  UAE: "AE",
  USA: "US",
  NAM: "NA",
  OMAN: "OM",
  NED: "NL",
  PNG: "PG",
  HK: "HK",
  CAN: "CA",
  BER: "BM",
  KEN: "KE",
  UGA: "UG",
  MLY: "MY",      
  GER: "DE",      
  DEN: "DK",      
  SIN: "SG",      
  KUW: "KW",      
  VAN: "VU",      
  JER: "JE",     
  FIJI: "FJ",     
  ITA: "IT",      
  BW: "BW",       
  BEL: "BE",      
  IRN: "IR",      
};

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
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg "
              >
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4 gap-2">
                    {teamSNameToCountryCode[team.teamSName] ? (
                      <div className="w-28 h-16 bg-white flex items-center justify-center border-2 border-gray-700 shadow flex-shrink-0">
                        <ReactCountryFlag
                          countryCode={teamSNameToCountryCode[team.teamSName]}
                          svg
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-16 bg-green-100 flex items-center justify-center">
                        <span className="text-2xl font-bold text-green-800">
                          {team.teamSName}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    {team.teamName}
                  </h3>
                </div>
                <div className="bg-gray-200 px-6 py-4 mb-6">
                  <div className="flex justify-center space-x-4">
                    <Link to={`/teams/${team.teamId}/players`}>Players</Link>
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
