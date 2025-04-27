import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ResumeMatcher from './pages/ResumeMatcher';
import { NotificationProvider, NotificationContainer } from './contexts/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <NotificationContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/resume-matcher" element={<ResumeMatcher />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;