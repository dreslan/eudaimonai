import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import type { Achievement, Quest } from '../types';
import { ArrowLeft, Printer } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AchievementCard from '../components/AchievementCard';

const AchievementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [linkedQuest, setLinkedQuest] = useState<Quest | null>(null);
  const isPublic = window.location.pathname.startsWith('/public');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = isPublic 
            ? `http://localhost:8000/public/achievements/${id}`
            : `http://localhost:8000/achievements/${id}`;
            
        const achRes = await axios.get(url);
        setAchievement(achRes.data);

        if (achRes.data.quest_id) {
            try {
                const questUrl = isPublic
                    ? `http://localhost:8000/public/quests/${achRes.data.quest_id}`
                    : `http://localhost:8000/quests/${achRes.data.quest_id}`;
                
                if (!isPublic) {
                    const questRes = await axios.get(questUrl);
                    setLinkedQuest(questRes.data);
                }
            } catch (qError) {
                console.log("Could not fetch linked quest", qError);
            }
        }
      } catch (error) {
        console.error("Error fetching achievement details", error);
      }
    };
    fetchData();
  }, [id, isPublic]);

  const handlePrint = () => {
    if (achievement) {
        window.open(`/print/achievements/${achievement.id}`, '_blank');
    }
  };

  if (!achievement) return <div className="text-center p-10 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col items-center min-h-screen">
      <div className="w-full flex justify-between mb-8">
          {!isPublic ? (
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
          ) : (
             <button onClick={() => window.history.back()} className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
             </button>
          )}
          
          <button 
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded transition-colors shadow-lg"
          >
            <Printer className="w-5 h-5 mr-2" /> Print Card
          </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-12 items-center justify-center mt-4">
        <div className="transform scale-100 sm:scale-110">
            <AchievementCard 
                achievement={achievement} 
                questTitle={linkedQuest?.title}
                username={!isPublic ? (user?.display_name || user?.username) : undefined}
                forceFace="front"
                hideActions
            />
        </div>
        <div className="transform scale-100 sm:scale-110">
            <AchievementCard 
                achievement={achievement} 
                questTitle={linkedQuest?.title}
                username={!isPublic ? (user?.display_name || user?.username) : undefined}
                forceFace="back"
                hideActions
            />
        </div>
      </div>
    </div>
  );
};

export default AchievementDetail;
