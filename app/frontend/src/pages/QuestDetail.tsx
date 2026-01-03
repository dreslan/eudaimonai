import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Quest, Achievement } from '../types';
import { ArrowLeft, CheckSquare, Edit, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AchievementCard from '../components/AchievementCard';

const QuestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [linkedAchievements, setLinkedAchievements] = useState<Achievement[]>([]);

  const fetchData = async () => {
    try {
      const questRes = await axios.get(`http://localhost:8000/quests/${id}`);
      setQuest(questRes.data);
      
      const achievementsRes = await axios.get('http://localhost:8000/achievements');
      
      // Sort: Date Ascending, then Creation Order (Index) Ascending
      const linked = achievementsRes.data
        .map((a: Achievement, index: number) => ({ ...a, _originalIndex: index }))
        .filter((a: any) => a.quest_id === id)
        .sort((a: any, b: any) => {
            const dateDiff = new Date(a.date_completed).getTime() - new Date(b.date_completed).getTime();
            if (dateDiff !== 0) return dateDiff;
            return a._originalIndex - b._originalIndex;
        });
        
      setLinkedAchievements(linked);
    } catch (error) {
      console.error("Error fetching quest details", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this quest? This cannot be undone.")) {
        try {
            await axios.delete(`http://localhost:8000/quests/${id}`);
            navigate('/');
        } catch (error) {
            console.error("Error deleting quest", error);
        }
    }
  };

  const handleComplete = async () => {
    if (window.confirm("Are you ready to claim victory? This will generate an achievement.")) {
        try {
            const res = await axios.patch(`http://localhost:8000/quests/${id}`, { status: 'completed' });
            setQuest(res.data);
            fetchData(); // Refresh to show the completion achievement
        } catch (error) {
            console.error("Error completing quest", error);
        }
    }
  };

  if (!quest) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-800 dark:text-dcc-system dark:hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <div className="flex space-x-2">
            {quest.status !== 'completed' && (
                <button
                    onClick={handleComplete}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-700 dark:hover:bg-green-600"
                >
                    <CheckSquare className="w-4 h-4 mr-1" /> Complete
                </button>
            )}
            <Link
                to={`/quests/${id}/edit`}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:bg-dcc-card dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            >
                <Edit className="w-4 h-4 mr-1" /> Edit
            </Link>
            <button
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-dcc-danger dark:hover:bg-red-600"
            >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
            </button>
        </div>
      </div>

      <div className="bg-white dark:bg-dcc-card shadow rounded-lg p-8 border dark:border-dcc-system/20">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{quest.title}</h1>
            <div className="mt-2 flex space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                ${quest.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                {quest.status.toUpperCase()}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                {quest.dimension}
              </span>
            </div>
        </div>

        {/* Victory Condition */}
        {quest.victory_condition && (
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8 rounded-r-md dark:bg-orange-900/20 dark:border-dcc-system">
                <h3 className="text-sm font-bold text-orange-900 dark:text-dcc-system uppercase tracking-wide mb-1">Victory Condition</h3>
                <p className="text-orange-800 dark:text-orange-200 font-medium">{quest.victory_condition}</p>
            </div>
        )}

        {/* Quest Log / Updates */}
        <div className="border-t dark:border-gray-700 pt-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quest Log</h2>
            
            {/* Add Update Button */}
            {quest.status !== 'completed' && (
                <div className="mb-8">
                    <Link
                        to={`/achievements/new?quest_id=${quest.id}`}
                        className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-md transform transition hover:scale-[1.02]"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Claim Achievement / Log Progress
                    </Link>
                </div>
            )}

            {/* Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {linkedAchievements.length === 0 ? (
                    <p className="text-gray-500 italic col-span-full">No updates yet. Start your journey!</p>
                ) : (
                    linkedAchievements.map((ach) => (
                        <AchievementCard 
                            key={ach.id} 
                            achievement={ach} 
                            username={user?.display_name || user?.username}
                        />
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuestDetail;
