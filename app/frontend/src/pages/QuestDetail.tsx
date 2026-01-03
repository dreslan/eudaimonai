import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Quest, Achievement } from '../types';
import { ArrowLeft, CheckSquare, Edit, Trash2, Plus, ExternalLink } from 'lucide-react';

const QuestLogItem: React.FC<{ achievement: Achievement; index: number }> = ({ achievement, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isCompletion = achievement.title.startsWith("Quest Complete:");

  return (
    <div className="relative flex gap-4">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-8 bottom-[-32px] w-0.5 bg-gray-200 last:hidden"></div>
      
      <div className="flex-shrink-0 mt-1">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm z-10 relative
            ${isCompletion ? 'bg-yellow-400 border-yellow-600 text-yellow-900' : 'bg-indigo-100 border-white text-indigo-600'}`}>
            <span className="text-xs font-bold">
                {isCompletion ? '★' : `#${index + 1}`}
            </span>
        </div>
      </div>
      
      <div 
        className="flex-1 relative group cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
            className="relative w-full transition-transform duration-500"
            style={{ 
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
        >
            {/* Front Face */}
            <div 
                className={`relative w-full rounded-lg p-4 border shadow-md flex flex-col justify-between min-h-[140px]
                    ${isCompletion 
                        ? 'bg-yellow-50 border-yellow-400' 
                        : 'bg-white border-gray-200 hover:border-indigo-300'}`}
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className={`font-bold text-lg ${isCompletion ? 'text-yellow-900 uppercase tracking-wide' : 'text-gray-900'}`}>
                            {achievement.title}
                        </h3>
                    </div>
                    <p className={`text-sm mt-2 ${isCompletion ? 'text-yellow-800' : 'text-gray-600'}`}>
                        {achievement.context}
                    </p>
                </div>
                <div className="flex justify-between items-end mt-4">
                    <span className={`text-xs font-mono ${isCompletion ? 'text-yellow-700' : 'text-gray-400'}`}>
                        {new Date(achievement.date_completed).toLocaleDateString()} {new Date(achievement.date_completed).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    <span className="text-xs text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Click to flip</span>
                </div>
            </div>

            {/* Back Face */}
            <div 
                className={`absolute inset-0 w-full h-full rounded-lg p-4 border shadow-md flex flex-col justify-between
                    ${isCompletion 
                        ? 'bg-yellow-100 border-yellow-500' 
                        : 'bg-indigo-50 border-indigo-200'}`}
                style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)' 
                }}
            >
                <div>
                    <p className="text-sm italic text-gray-700 line-clamp-3">
                        "{achievement.ai_description}"
                    </p>
                </div>
                
                <div className="flex justify-end mt-2" onClick={(e) => e.stopPropagation()}>
                    <Link 
                        to={`/achievements/${achievement.id}`}
                        className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white px-2 py-1 rounded border border-indigo-200 shadow-sm"
                    >
                        View Full Card <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const QuestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [linkedAchievements, setLinkedAchievements] = useState<Achievement[]>([]);
  const [newUpdate, setNewUpdate] = useState('');

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

  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdate.trim() || !quest) return;

    try {
        await axios.post('http://localhost:8000/achievements', {
            title: newUpdate,
            context: `Update for quest: ${quest.title}`,
            date_completed: new Date().toISOString(),
            dimension: quest.dimension,
            quest_id: quest.id
        });
        setNewUpdate('');
        fetchData();
    } catch (error) {
        console.error("Error adding update", error);
    }
  };

  if (!quest) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <div className="flex space-x-2">
            {quest.status !== 'completed' && (
                <button
                    onClick={handleComplete}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    <CheckSquare className="w-4 h-4 mr-1" /> Complete
                </button>
            )}
            <Link
                to={`/quests/${id}/edit`}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <Edit className="w-4 h-4 mr-1" /> Edit
            </Link>
            <button
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
            </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-8">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{quest.title}</h1>
            <div className="mt-2 flex space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                ${quest.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {quest.status.toUpperCase()}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {quest.dimension}
              </span>
            </div>
        </div>

        {/* Victory Condition */}
        {quest.victory_condition && (
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-8 rounded-r-md">
                <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-1">Victory Condition</h3>
                <p className="text-indigo-800 font-medium">{quest.victory_condition}</p>
            </div>
        )}

        {/* Quest Log / Updates */}
        <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quest Log</h2>
            
            {/* Add Update Form */}
            {quest.status !== 'completed' && (
                <form onSubmit={handleAddUpdate} className="mb-8 flex gap-2">
                    <input
                        type="text"
                        value={newUpdate}
                        onChange={(e) => setNewUpdate(e.target.value)}
                        placeholder="Log an update..."
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Log
                    </button>
                </form>
            )}

            {/* Timeline */}
            <div className="space-y-8">
                {linkedAchievements.length === 0 ? (
                    <p className="text-gray-500 italic">No updates yet. Start your journey!</p>
                ) : (
                    linkedAchievements.map((ach, index) => (
                        <QuestLogItem key={ach.id} achievement={ach} index={index} />
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuestDetail;
