import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import type { Achievement } from '../types';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/profile');
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchData();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dcc-card shadow rounded-lg p-6 text-center border dark:border-dcc-system/20">
        <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/50 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-orange-600 dark:text-dcc-system mb-4">
          {profile.username.charAt(0)}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.username}</h1>
        <p className="text-gray-500 dark:text-gray-400">Level {profile.level} Adventurer</p>
        
        <div className="grid grid-cols-3 gap-4 mt-6 border-t dark:border-gray-700 pt-6">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{profile.stats.quests_active}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Active Quests</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{profile.stats.quests_completed}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{profile.stats.achievements_unlocked}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Achievements</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dcc-card shadow rounded-lg p-6 border dark:border-dcc-system/20">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.recent_achievements.map((ach: Achievement) => (
            <Link key={ach.id} to={`/achievements/${ach.id}`} className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-t-4 border-yellow-400 dark:border-dcc-gold group">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                {ach.image_url && <img src={ach.image_url} alt={ach.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />}
                <div className="absolute top-0 right-0 bg-yellow-400 dark:bg-dcc-gold text-xs font-bold px-2 py-1 uppercase tracking-wider text-yellow-900 dark:text-black transform rotate-0">
                    Unlocked
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-black text-lg mb-1 text-gray-900 dark:text-white uppercase tracking-wide">{ach.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">{new Date(ach.date_completed).toLocaleDateString()} {new Date(ach.date_completed).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 italic border-l-2 border-gray-200 dark:border-gray-600 pl-2">"{ach.ai_description || ach.context}"</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
