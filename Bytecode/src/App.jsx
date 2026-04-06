import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayPage from './pages/Display.page';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="bg-surface min-h-screen">
        <Routes>
          <Route path="/" element={<DisplayPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
