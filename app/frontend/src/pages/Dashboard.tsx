import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import type { Quest, Achievement } from '../types';
import { CheckCircle, Circle, Trophy } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questsRes = await axios.get('http://localhost:8000/quests');
        const achievementsRes = await axios.get('http://localhost:8000/achievements');
        setQuests(questsRes.data);
        setAchievements(achievementsRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const activeQuests = quests.filter(q => q.status === 'active');
  const completedQuests = quests.filter(q => q.status === 'completed');

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Quests */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Circle className="w-5 h-5 mr-2 text-blue-500" />
            Active Quests
          </h2>
          <div className="space-y-4">
            {activeQuests.length === 0 ? (
                <p className="text-gray-500 italic">No active quests. Start an adventure!</p>
            ) : (
                activeQuests.map(quest => (
                <Link to={`/quests/${quest.id}`} key={quest.id} className="block border-b pb-4 last:border-0 last:pb-0 hover:bg-gray-50 transition-colors p-2 -mx-2 rounded">
                    <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-lg text-indigo-600">{quest.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{quest.victory_condition || "No victory condition defined."}</p>
                        <div className="mt-2 flex space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {quest.dimension}
                        </span>
                        </div>
                    </div>
                    </div>
                </Link>
                ))
            )}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Recent Achievements
          </h2>
          <div className="space-y-4">
            {achievements.length === 0 ? (
                <p className="text-gray-500 italic">No achievements yet. Go get 'em!</p>
            ) : (
                achievements.slice(-5).reverse().map(achievement => (
                <Link to={`/achievements/${achievement.id}`} key={achievement.id} className="flex space-x-4 border-b pb-4 last:border-0 last:pb-0 hover:bg-yellow-50 transition-colors p-3 -mx-2 rounded border-l-4 border-transparent hover:border-yellow-400 group">
                    <div className="flex-shrink-0 w-16 h-24 bg-gray-200 rounded overflow-hidden relative">
                        {achievement.image_url && <img src={achievement.image_url} alt={achievement.title} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                    <h3 className="font-black text-lg text-gray-900 uppercase tracking-wide group-hover:text-yellow-600 transition-colors">{achievement.title}</h3>
                    <p className="text-xs text-gray-500 mb-1 font-mono">{new Date(achievement.date_completed).toLocaleDateString()} {new Date(achievement.date_completed).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    <p className="text-gray-600 text-sm line-clamp-2 italic">"{achievement.ai_description || achievement.context}"</p>
                    </div>
                </Link>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Completed Quests */}
      {completedQuests.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Completed Quests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedQuests.map(quest => (
                    <Link to={`/quests/${quest.id}`} key={quest.id} className="block border rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
                        <h3 className="font-semibold text-lg text-gray-800">{quest.title}</h3>
                        <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Completed
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
