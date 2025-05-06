import AppRouter from './router/AppRouter';
import matchData from './data/matchData.json';

function App() {
  return <AppRouter data={matchData} />;
}

export default App;
