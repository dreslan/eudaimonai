import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import type { Quest, Achievement } from '../types';
import { Circle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import QuestCard from '../components/QuestCard';
import Landing from './Landing';

const Dashboard: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questsRes = await axios.get('http://localhost:8000/quests');
        const achievementsRes = await axios.get('http://localhost:8000/achievements');
        setQuests(questsRes.data);
        setAchievements(achievementsRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const activeQuests = quests.filter(q => q.status === 'active');

  if (loading) {
    return <div className="text-center py-10 text-gray-500 dark:text-gray-400">Loading dungeon data...</div>;
  }

  if (quests.length === 0 && achievements.length === 0) {
    return <Landing />;
  }

  return (
    <div className="space-y-12 px-4 sm:px-0 pb-12">
      {/* Active Quests */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
          <Circle className="w-6 h-6 mr-2 text-orange-500 dark:text-dcc-system" />
          Active Quests
        </h2>
        
        {activeQuests.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 italic text-lg">No active quests. You're slacking, Crawler.</p>
                <Link to="/quests/new" className="mt-4 inline-block px-4 py-2 bg-dcc-system text-white rounded hover:bg-orange-700 transition-colors">
                    Start New Quest
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {activeQuests.map(quest => (
                    <QuestCard 
                        key={quest.id} 
                        quest={quest} 
                        username={user?.display_name || user?.username}
                    />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
