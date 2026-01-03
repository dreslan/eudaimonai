import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewQuest from './pages/NewQuest';
import NewAchievement from './pages/NewAchievement';
import Profile from './pages/Profile';
import Tools from './pages/Tools';

import QuestDetail from './pages/QuestDetail';
import AchievementDetail from './pages/AchievementDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="quests/new" element={<NewQuest />} />
          <Route path="quests/:id" element={<QuestDetail />} />
          <Route path="quests/:id/edit" element={<NewQuest />} />
          <Route path="achievements/new" element={<NewAchievement />} />
          <Route path="achievements/:id" element={<AchievementDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tools" element={<Tools />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
