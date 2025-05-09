import staterecordData from "../data/staterecordData.json";
import statefilterData from "../data/statefilterData.json";
import stateiccstandingData from "../data/stateiccstandingData.json";
import staterankingData from "../data/staterankingData.json";
import React, { useState , useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import { GiCricketBat } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { FaBaseballBall } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";

const SIDEBAR = [
  { key: "icc", label: "ICC Standings", icon: <FaUsers size={20} className="text-blue-400" /> },
  { key: "batting", label: "Batting Records", icon: <GiCricketBat size={20} className="text-blue-400" /> },
  { key: "bowling", label: "Bowling Records", icon: <FaBaseballBall size={20} className="text-blue-400" /> },
  { key: "ranking", label: "Player Rankings", icon: <MdLeaderboard size={20} className="text-blue-400" /> },
];

const COUNTRY_NAME_TO_CODE = {
  "South Africa": "ZA",
  "Australia": "AU",
  "India": "IN",
  "New Zealand": "NZ",
  "England": "GB",
  "Sri Lanka": "LK",
  "Bangladesh": "BD",
  "West Indies": "WI", 
  "Pakistan": "PK"
};
function getCountryCode(name) {
  return COUNTRY_NAME_TO_CODE[name] || "";
}

const MATCH_TYPES = [
  { id: "1", label: "Test" },
  { id: "2", label: "ODI" },
  { id: "3", label: "T20I" },
];

const getPlayerImg = (faceImageId) =>
  faceImageId
    ? `https://www.cricbuzz.com/a/img/v1/100x100/i${faceImageId}.jpg`
    : "https://via.placeholder.com/100";

function Sidebar({ active, setActive }) {
  return (
    <div className="w-64 p-4 flex flex-col gap-3">
      {SIDEBAR.map((item) => (
        <button
          key={item.key}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 transition justify-between ${
            active === item.key ? "ring-2 ring-blue-400" : ""
          }`}
          onClick={() => setActive(item.key)}
        >
          <span className="flex items-center gap-2">
            {item.icon}
            <span className="font-medium text-gray-700">{item.label}</span>
          </span>
          <FiChevronRight className="text-gray-400" />
        </button>
      ))}
    </div>
  );
}

function BattingRecordsTable({ records }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-2 text-left">#</th>
            <th className="px-2 py-2 text-left">Batter</th>
            <th className="px-2 py-2 text-left">Matches</th>
            <th className="px-2 py-2 text-left">Innings</th>
            <th className="px-2 py-2 text-left">Runs</th>
            <th className="px-2 py-2 text-left">Avg</th>
          </tr>
        </thead>
        <tbody>
          {records.map((row, idx) => (
            <tr key={row.values[0]} className="border-t">
              <td className="px-2 py-2 font-bold">{idx + 1}</td>
              <td className="px-2 py-2">{row.values[1]}</td>
              <td className="px-2 py-2">{row.values[2]}</td>
              <td className="px-2 py-2">{row.values[3]}</td>
              <td className="px-2 py-2">{row.values[4]}</td>
              <td className="px-2 py-2">{row.values[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MatchTypeTabs({ selected, setSelected }) {
  return (
    <div className="flex gap-2 mb-4">
      {MATCH_TYPES.map((type) => (
        <button
          key={type.id}
          className={`px-5 py-2 rounded-full border text-sm font-semibold ${
            selected === type.id
              ? "bg-red-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
          onClick={() => setSelected(type.id)}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}

function TopPlayerCard({ player, statLabel, statValue }) {
  return (
    <div className="flex items-center bg-blue-800 rounded-xl p-6 mb-4 shadow relative">
      <img
        src={getPlayerImg(player.faceImageId)}
        alt={player.name}
        className="w-28 h-28 rounded-full border-4 border-white object-cover bg-white -mt-10 mr-6"
      />
      <div className="flex-1">
        <div className="text-4xl font-bold text-white flex items-center gap-2">
          #{player.rank}
          <span className="text-lg font-normal text-blue-200 ml-2">{player.name}</span>
        </div>
        <div className="text-xl text-blue-100 font-semibold">{player.country}</div>
        <div className="flex gap-6 mt-2 text-blue-200">
          <div>
            <span className="block text-xs">Matches</span>
            <span className="font-bold text-lg">{player.matches || "--"}</span>
          </div>
          <div>
            <span className="block text-xs">Inns</span>
            <span className="font-bold text-lg">{player.inns || "--"}</span>
          </div>
          <div>
            <span className="block text-xs">Avg</span>
            <span className="font-bold text-lg">{player.avg || "--"}</span>
          </div>
          <div>
            <span className="block text-xs">SR</span>
            <span className="font-bold text-lg">{player.sr || "--"}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 bg-blue-100 px-6 py-2 rounded-xl text-blue-900 text-center shadow">
        <div className="text-2xl font-bold">{statValue}</div>
        <div className="text-xs uppercase tracking-wider">{statLabel}</div>
      </div>
    </div>
  );
}

// Add this component for Bowling Leaderboard
function BowlingLeaderboard({ ranking }) {
  const topPlayer = ranking[0];
  const restPlayers = ranking.slice(1);

  return (
    <div>
      {/* Top Player Card */}
      <div className="relative bg-[#2d5d8c] rounded-2xl p-6 mb-8 shadow-lg border border-blue-200 flex items-center overflow-hidden">
        <img
          src={`https://www.cricbuzz.com/a/img/v1/100x100/i${topPlayer.faceImageId}.jpg`}
          alt={topPlayer.name}
          className="w-36 h-36 rounded-full border-4 border-white object-cover bg-white mr-8"
        />
        <div className="flex-1">
          <div className="flex items-end gap-3 mb-4">
            <span className="text-6xl font-extrabold text-[#b8d2e6]">#{topPlayer.rank}</span>
            <div>
              <div className="text-base text-[#b8d2e6]">{topPlayer.name}</div>
              <div className="text-3xl font-bold text-white tracking-wide uppercase">
                {topPlayer.country}
              </div>
            </div>
          </div>
          {/* Stat grid */}
          <div className="grid grid-cols-5 gap-6 text-[#b8d2e6] text-center mt-6">
            <div>
              <div className="text-xs">Rating</div>
              <div className="text-lg font-bold">{topPlayer.rating}</div>
            </div>
            <div>
              <div className="text-xs">Points</div>
              <div className="text-lg font-bold">{topPlayer.points}</div>
            </div>
            <div>
              <div className="text-xs">Last Updated</div>
              <div className="text-lg font-bold">{topPlayer.lastUpdatedOn}</div>
            </div>
            <div>
              <div className="text-xs">Country</div>
              <div className="text-lg font-bold">{topPlayer.country}</div>
            </div>
            <div>
              <div className="text-xs">Name</div>
              <div className="text-lg font-bold">{topPlayer.name}</div>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-6 bg-[#d6f6ff] px-8 py-3 rounded-xl text-[#2d5d8c] text-center shadow-lg">
          <div className="text-3xl font-bold">{topPlayer.points}</div>
          <div className="text-sm tracking-wider">Most Wickets</div>
        </div>
      </div>

      {/* Rest of the Players Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="grid grid-cols-7 gap-0 px-6 py-2 border-b bg-gray-50 font-semibold text-gray-600 text-sm">
          <div className="text-center">#</div>
          <div className="text-left">Player</div>
          <div className="text-center">Country</div>
          <div className="text-center">Rating</div>
          <div className="text-center">Points</div>
          <div className="text-center">Last Updated</div>
          <div className="text-center">ID</div>
        </div>
        {restPlayers.map((player) => (
          <div
            key={player.id}
            className="grid grid-cols-7 gap-0 px-6 py-4 border-b last:border-b-0 items-center hover:bg-gray-50 transition"
          >
            <div className="text-2xl font-bold text-[#7b8ca6] text-center">{player.rank}</div>
            <div className="text-blue-900 font-semibold text-lg">{player.name}</div>
            <div className="text-center text-base text-gray-800">{player.country}</div>
            <div className="text-center text-base text-gray-800">{player.rating}</div>
            <div className="text-center text-base text-gray-800">{player.points}</div>
            <div className="text-center text-xs text-gray-500">{player.lastUpdatedOn}</div>
            <div className="text-center text-xs text-gray-400">{player.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// REMOVE this duplicate definition of BowlingRecordsTable!
/*
function BowlingRecordsTable({ bowlingRecords }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-2 text-left">#</th>
            <th className="px-2 py-2 text-left">Bowler</th>
            <th className="px-2 py-2 text-left">Matches</th>
            <th className="px-2 py-2 text-left">Wickets</th>
            <th className="px-2 py-2 text-left">Avg</th>
            <th className="px-2 py-2 text-left">SR</th>
          </tr>
        </thead>
        <tbody>
          {bowlingRecords.map((player, idx) => (
            <tr key={player.id} className="border-t">
              <td className="px-2 py-2 font-bold">{idx + 1}</td>
              <td className="px-2 py-2">{player.name}</td>
              <td className="px-2 py-2">{player.matches || "--"}</td>
              <td className="px-2 py-2">{player.points}</td>
              <td className="px-2 py-2">{player.avg || "--"}</td>
              <td className="px-2 py-2">{player.sr || "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
*/

function StatsTypeTabs({ category, selectedType, setSelectedType }) {
  // Find the types for the given category (Batting/Bowling)
  const types = statefilterData.statsTypesList.find(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  )?.types || [];
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {types.map((type) => (
        <button
          key={type.value}
          className={`px-4 py-2 rounded-full border text-xs font-semibold ${
            selectedType === type.value
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
          onClick={() => setSelectedType(type.value)}
        >
          {type.header}
        </button>
      ))}
    </div>
  );
}

function CustomDropdown({ icon, label, options, selected, setSelected, open, setOpen }) {
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  return (
    <div className="relative mb-4" ref={dropdownRef}>
      <button
        className="flex items-center w-full px-4 py-2 border rounded-t-lg bg-white font-medium text-gray-700 hover:bg-blue-50 focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        {icon}
        <span className="ml-2">{label}</span>
        <span className="ml-auto">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div className="absolute left-0 right-0 bg-white border border-t-0 rounded-b-lg shadow z-10">
          {options.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                selected === option.value ? "bg-blue-100 text-blue-700" : ""
              }`}
              onClick={() => {
                setSelected(option.value);
                setOpen(false);
              }}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarAccordion({
  activeSection,
  setActiveSection,
  battingOpen,
  setBattingOpen,
  selectedBattingType,
  setSelectedBattingType,
  bowlingOpen,
  setBowlingOpen,
  selectedBowlingType,
  setSelectedBowlingType,
  battingTypes,
  bowlingTypes,
}) {
  return (
    <div className="w-64 p-4 flex flex-col gap-3">
      {/* ICC Standings */}
      <button
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 transition justify-between ${
          activeSection === "icc" ? "ring-2 ring-blue-400" : ""
        }`}
        onClick={() => setActiveSection("icc")}
      >
        <span className="flex items-center gap-2">
          <FaUsers size={20} className="text-blue-400" />
          <span className="font-medium text-gray-700">ICC Standings</span>
        </span>
        <FiChevronRight className="text-gray-400" />
      </button>

      {/* Batting Records Accordion */}
      <div>
        <button
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 transition justify-between w-full ${
            activeSection === "batting" ? "ring-2 ring-blue-400" : ""
          }`}
          onClick={() => {
            setActiveSection("batting");
            setBattingOpen((prev) => !prev);
          }}
        >
          <span className="flex items-center gap-2">
            <GiCricketBat size={20} className="text-blue-400" />
            <span className="font-medium text-gray-700">Batting Records</span>
          </span>
          <span className="ml-auto">{battingOpen ? "▾" : "▸"}</span>
        </button>
        {battingOpen && activeSection === "batting" && (
          <div className="border border-t-0 border-blue-200 rounded-b-lg bg-white">
            {battingTypes.map((option) => (
              <button
                key={option.value}
                className={`w-full text-left px-6 py-2 hover:bg-blue-50 ${
                  selectedBattingType === option.value ? "bg-blue-100 text-blue-700" : ""
                }`}
                onClick={() => setSelectedBattingType(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bowling Records Accordion */}
      <div>
        <button
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 transition justify-between w-full ${
            activeSection === "bowling" ? "ring-2 ring-blue-400" : ""
          }`}
          onClick={() => {
            setActiveSection("bowling");
            setBowlingOpen((prev) => !prev);
          }}
        >
          <span className="flex items-center gap-2">
            <FaBaseballBall size={20} className="text-blue-400" />
            <span className="font-medium text-gray-700">Bowling Records</span>
          </span>
          <span className="ml-auto">{bowlingOpen ? "▾" : "▸"}</span>
        </button>
        {bowlingOpen && activeSection === "bowling" && (
          <div className="border border-t-0 border-blue-200 rounded-b-lg bg-white">
            {bowlingTypes.map((option) => (
              <button
                key={option.value}
                className={`w-full text-left px-6 py-2 hover:bg-blue-50 ${
                  selectedBowlingType === option.value ? "bg-blue-100 text-blue-700" : ""
                }`}
                onClick={() => setSelectedBowlingType(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Player Rankings */}
      <button
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 transition justify-between ${
          activeSection === "ranking" ? "ring-2 ring-blue-400" : ""
        }`}
        onClick={() => setActiveSection("ranking")}
      >
        <span className="flex items-center gap-2">
          <MdLeaderboard size={20} className="text-blue-400" />
          <span className="font-medium text-gray-700">Player Rankings</span>
        </span>
        <FiChevronRight className="text-gray-400" />
      </button>
    </div>
  );
}

// Add this component for Bowling Records Table
function BowlingRecordsTable({ bowlingRecords }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-2 text-left">#</th>
            <th className="px-2 py-2 text-left">Bowler</th>
            <th className="px-2 py-2 text-left">Matches</th>
            <th className="px-2 py-2 text-left">Wickets</th>
            <th className="px-2 py-2 text-left">Avg</th>
            <th className="px-2 py-2 text-left">SR</th>
          </tr>
        </thead>
        <tbody>
          {bowlingRecords.map((player, idx) => (
            <tr key={player.id} className="border-t">
              <td className="px-2 py-2 font-bold">{idx + 1}</td>
              <td className="px-2 py-2">{player.name}</td>
              <td className="px-2 py-2">{player.matches || "--"}</td>
              <td className="px-2 py-2">{player.points}</td>
              <td className="px-2 py-2">{player.avg || "--"}</td>
              <td className="px-2 py-2">{player.sr || "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// REMOVE THE DUPLICATE DEFINITION of StatsTypeTabs below this line
/*
function StatsTypeTabs({ category, selectedType, setSelectedType }) {
  // Find the types for the given category (Batting/Bowling)
  const types = statefilterData.statsTypesList.find(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  )?.types || [];
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {types.map((type) => (
        <button
          key={type.value}
          className={`px-4 py-2 rounded-full border text-xs font-semibold ${
            selectedType === type.value
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
          onClick={() => setSelectedType(type.value)}
        >
          {type.header}
        </button>
      ))}
    </div>
  );
}
*/

function CustomDropdown({ icon, label, options, selected, setSelected, open, setOpen }) {
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  return (
    <div className="relative mb-4" ref={dropdownRef}>
      <button
        className="flex items-center w-full px-4 py-2 border rounded-t-lg bg-white font-medium text-gray-700 hover:bg-blue-50 focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        {icon}
        <span className="ml-2">{label}</span>
        <span className="ml-auto">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div className="absolute left-0 right-0 bg-white border border-t-0 rounded-b-lg shadow z-10">
          {options.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                selected === option.value ? "bg-blue-100 text-blue-700" : ""
              }`}
              onClick={() => {
                setSelected(option.value);
                setOpen(false);
              }}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StatsPage() {
  const [activeSection, setActiveSection] = useState("batting");
  const [battingOpen, setBattingOpen] = useState(true);
  const [bowlingOpen, setBowlingOpen] = useState(false);
// Remove duplicate declaration since it's already declared below
// Remove duplicate declaration since it's already declared below
  const [selectedMatchType, setSelectedMatchType] = useState("1");
  const [selectedBattingType, setSelectedBattingType] = useState("mostRuns");
  const [selectedBowlingType, setSelectedBowlingType] = useState("mostWickets");
  const [battingDropdownOpen, setBattingDropdownOpen] = useState(false);
  const [bowlingDropdownOpen, setBowlingDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Define battingTypes and bowlingTypes here
  const battingTypes = [
    { value: "mostRuns", label: "Most Runs" },
    { value: "highestScore", label: "Highest Score" },
    { value: "bestBattingAvg", label: "Highest Average" },
    { value: "mostFifties", label: "Most Fifties" },
    { value: "mostHundreds", label: "Most Hundreds" },
    { value: "bestBattingSR", label: "Highest Strike Rate" },
    { value: "mostFours", label: "Most Fours" },
    { value: "mostSixes", label: "Most Sixes" },
  ];
  const bowlingTypes = [
    { value: "mostWickets", label: "Most Wickets" },
    { value: "bestBowlingAvg", label: "Best Bowling Average" },
    { value: "bestBowling", label: "Best Bowling" },
    { value: "most5Wickets", label: "Most 5 Wickets Haul" },
    { value: "bestEconomy", label: "Best Economy" },
    { value: "bestBowlingSR", label: "Best Bowling Strike Rate" },
  ];

  // Filter batting records by match type (from staterecordData.json)
  const battingRecords = staterecordData.values || [];

  // For demo: Use staterankingData.rank for player rankings
  const playerRankings = staterankingData.rank || [];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SidebarAccordion
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        battingOpen={battingOpen}
        setBattingOpen={setBattingOpen}
        selectedBattingType={selectedBattingType}
        setSelectedBattingType={setSelectedBattingType}
        bowlingOpen={bowlingOpen}
        setBowlingOpen={setBowlingOpen}
        selectedBowlingType={selectedBowlingType}
        setSelectedBowlingType={setSelectedBowlingType}
        battingTypes={battingTypes}
        bowlingTypes={bowlingTypes}
      />
      {/* ... rest of your main content ... */}
    </div>
  );
}

export default StatsPage;

