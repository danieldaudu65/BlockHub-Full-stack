import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './pages/layout';
import Discover from './pages/discover/Discover';
import Top_Oppurtunities from './pages/discover/components/Top_Oppurtunities';
import IdPage from './pages/discover/top-opp/IdPage/IdPage';
import EventScreen from './pages/event/EventScreen';
import Profile from './pages/profile/Profile';
import Search from './pages/search/Search';
import PostJob from './pages/create/postJob/PostJob';
import Welcome from './pages/onboarding/Welcome';
import SelectInterest from './pages/onboarding/selectInterest';
import RecentJobs from './pages/discover/components/RecentJobs';
import SuccessPage from './pages/create/components/SuccessPage';
import { Toaster } from 'react-hot-toast';
import UploadPortfolio from './pages/onboarding/UploadPortfolio';
import AllSetSuccess from './pages/onboarding/AllSetSuccess';
import ActivitiesScreen from './pages/discover/ActivitiesMessages/ActivitiesScreen';
import ChatRoom from './pages/discover/ActivitiesMessages/components/ChatRoom';
import ApplicantsPage from './pages/discover/ActivitiesMessages/components/ApplicantsPage';
import Bundle from './pages/discover/components/Bundle';
import ProjectsList from './pages/discover/components/ProjectsList';
import BundleDetail from './pages/discover/components/BundleDetails';
import ProtectedRoute from './components/ProtectedRoute';
// import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Public Route */}
          <Route index element={<Home />} />

          {/* Protected Routes */}
          <Route path="welcome" element={<Welcome />} />
          <Route path="select-interest" element={<ProtectedRoute><SelectInterest /></ProtectedRoute>} />
          <Route path="upload-portfolio" element={<ProtectedRoute><UploadPortfolio /></ProtectedRoute>} />
          <Route path="all-set-success" element={<ProtectedRoute><AllSetSuccess /></ProtectedRoute>} />
          <Route path="create/post" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
          <Route path="success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
          <Route path="discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
          <Route path="discover/top-opp" element={<ProtectedRoute><Top_Oppurtunities /></ProtectedRoute>} />
          <Route path="discover/top-opp/:_id" element={<ProtectedRoute><IdPage /></ProtectedRoute>} />
          <Route path="discover/recent-jobs" element={<ProtectedRoute><RecentJobs /></ProtectedRoute>} />
          <Route path="discover/recent-jobs/:_id" element={<ProtectedRoute><IdPage /></ProtectedRoute>} />
          <Route path="discover-activities" element={<ProtectedRoute><ActivitiesScreen /></ProtectedRoute>} />
          <Route path="chatroom/:id" element={<ProtectedRoute><ChatRoom /></ProtectedRoute>} />
          <Route path="applicants/:_id" element={<ProtectedRoute><ApplicantsPage /></ProtectedRoute>} />
          <Route path="event" element={<ProtectedRoute><EventScreen /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="bundle" element={<ProtectedRoute><Bundle /></ProtectedRoute>} />
          <Route path="bundle/projects" element={<ProtectedRoute><ProjectsList /></ProtectedRoute>} />
          <Route path="bundle/:id" element={<ProtectedRoute><BundleDetail /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
