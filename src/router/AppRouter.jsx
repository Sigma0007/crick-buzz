import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../pages/Layout';
import HomePage from '../pages/HomePage';
import MatchesPage from '../pages/MatchesPage';
import SchedulesPage from '../pages/SchedulesPage';
import SeriesPage from '../pages/series/SeriesPage';
import TeamsPage from '../pages/TeamsPage';
import VenuesPage from '../pages/VenuesPage';
import PlayersPage from '../pages/PlayersPage';
import NewsPage from '../pages/NewsPage';
import PhotosPage from '../pages/PhotosPage';
import StatsPage from '../pages/StatsPage';
import MatchDetailPage from "../pages/MatchDetailPage";
import SeriesDetailPage from '../pages/series/SeriesDetailPage';
import SeriesNewsPage from '../pages/series/SeriesNewsPage';
import SeriesPointsTablePage from '../pages/series/SeriesPointsTablePage';
import SeriesMatchesPage from '../pages/series/SeriesMatchesPage';
import TeamPlayersPage from '../pages/TeamPlayersPage';
import TeamMatchesPage from '../pages/TeamMatchesPage';

function AppRouter({ data }) {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/matches" element={<MatchesPage data={data} />} />
          <Route path="/schedules" element={<SchedulesPage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/series/:seriesId" element={<SeriesDetailPage />} />
          <Route path="/series/:seriesId/news" element={<SeriesNewsPage />} />
          <Route path="/series/:seriesId/points-table" element={<SeriesPointsTablePage />} />
          <Route path="/series/:seriesId/matches" element={<SeriesMatchesPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/match/:matchId" element={<MatchDetailPage />} />
          <Route path="/teams/:teamId/players" element={<TeamPlayersPage />} />
          <Route path="/teams/:teamId/matches" element={<TeamMatchesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRouter;