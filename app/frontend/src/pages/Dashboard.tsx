import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import type { Quest, Achievement } from '../types';
import { CheckCircle, Circle, Trophy, Skull } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import QuestCard from '../components/QuestCard';

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
  const completedQuests = quests.filter(q => q.status === 'completed');

  if (loading) {
    return <div className="text-center py-10 text-gray-500 dark:text-gray-400">Loading dungeon data...</div>;
  }

  if (quests.length === 0 && achievements.length === 0) {
    return (
        <div className="max-w-3xl mx-auto mt-10 p-8 bg-white dark:bg-dcc-card text-gray-900 dark:text-white rounded-xl border-2 border-dcc-system shadow-xl relative overflow-hidden">
            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full shadow-sm">
                    <Skull className="w-12 h-12 text-red-600 dark:text-red-500" />
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-dcc-system">
                    Welcome, {user?.display_name || user?.username || "Crawler"}!
                </h1>
                
                <div className="space-y-4 max-w-xl">
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        Oh, look at you. Fresh meat. You haven't done <span className="text-red-600 dark:text-red-400 italic">anything</span> yet.
                    </p>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                        You have zero quests. Zero achievements. You are statistically insignificant. 
                        But don't worry, the dungeon will grind you down regardless of your participation.
                    </p>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                        Why don't you try <Link to="/tools" className="text-orange-600 dark:text-orange-400 hover:underline">scanning a QR code</Link> or clicking a button before I get bored and terminate your session?
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link to="/quests/new" className="px-6 py-3 bg-dcc-system text-white dark:text-black font-bold text-base uppercase tracking-wider rounded hover:bg-orange-700 dark:hover:bg-orange-400 transition-colors shadow-md">
                        Start First Quest
                    </Link>
                    <Link to="/achievements/new" className="px-6 py-3 bg-white dark:bg-gray-800 text-dcc-system border-2 border-dcc-system font-bold text-base uppercase tracking-wider rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-md">
                        Log Achievement
                    </Link>
                </div>
            </div>
        </div>
    );
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

      {/* Recent Achievements */}
      <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
            <CheckCircle className="w-6 h-6 mr-2 text-green-500 dark:text-dcc-gold" />
            Recent Achievements
          </h2>
          <div className="bg-white dark:bg-dcc-card shadow rounded-lg p-6 border dark:border-dcc-system/20">
            <div className="space-y-4">
                {achievements.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 italic">No achievements yet. Go get 'em!</p>
                ) : (
                    achievements.slice(-5).reverse().map(achievement => (
                    <Link to={`/achievements/${achievement.id}`} key={achievement.id} className="flex space-x-4 border-b dark:border-gray-700 pb-4 last:border-0 last:pb-0 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors p-3 -mx-2 rounded border-l-4 border-transparent hover:border-yellow-400 group">
                        <div className="flex-shrink-0 w-16 h-24 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden relative">
                            {achievement.image_url && <img src={achievement.image_url} alt={achievement.title} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                        <h3 className="font-black text-lg text-gray-900 dark:text-gray-100 uppercase tracking-wide group-hover:text-yellow-600 dark:group-hover:text-dcc-gold transition-colors">{achievement.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-mono">{new Date(achievement.date_completed).toLocaleDateString()} {new Date(achievement.date_completed).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 italic">"{achievement.ai_description || achievement.context}"</p>
                        </div>
                    </Link>
                    ))
                )}
            </div>
          </div>
      </div>

      {/* Completed Quests */}
      {completedQuests.length > 0 && (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
                <Trophy className="w-6 h-6 mr-2 text-yellow-500 dark:text-dcc-gold" />
                Completed Quests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center opacity-75 hover:opacity-100 transition-opacity">
                {completedQuests.map(quest => (
                    <QuestCard key={quest.id} quest={quest} className="grayscale hover:grayscale-0 transition-all duration-500" />
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
