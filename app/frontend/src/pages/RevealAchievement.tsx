import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Achievement } from '../types';
import AchievementCard from '../components/AchievementCard';

const RevealAchievement: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [achievement, setAchievement] = useState<Achievement | null>(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievement = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/achievements/${id}`);
                setAchievement(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching achievement", error);
                setLoading(false);
            }
        };
        if (id) fetchAchievement();
    }, [id]);

    const handleReveal = () => {
        setIsRevealed(true);
    };

    if (loading) return <div className="text-center p-10 text-white">Loading Loot Box...</div>;
    if (!achievement) return <div className="text-center p-10 text-red-500">Achievement not found.</div>;

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-gray-900 to-black pointer-events-none"></div>

            <div className="z-10 flex flex-col items-center gap-8">
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 uppercase tracking-widest animate-pulse">
                    {isRevealed ? "Achievement Unlocked!" : "Loot Box Acquired"}
                </h1>

                {/* Card Container */}
                <div 
                    className="relative w-[300px] h-[420px] cursor-pointer perspective-1000"
                    onClick={handleReveal}
                >
                    <div className={`relative w-full h-full transition-transform duration-1000 transform-style-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
                        
                        {/* Front (Card Back) */}
                        <div className="absolute inset-0 w-full h-full backface-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black border-4 border-yellow-600 rounded-xl shadow-2xl flex items-center justify-center flex-col gap-4 p-6">
                                <div className="w-24 h-24 rounded-full bg-yellow-600/20 flex items-center justify-center border-2 border-yellow-600 animate-bounce">
                                    <span className="text-4xl">?</span>
                                </div>
                                <div className="text-yellow-600 font-bold tracking-widest uppercase text-center">
                                    Tap to Reveal
                                </div>
                                <div className="text-xs text-gray-500 text-center mt-4">
                                    Warning: AI Judgment Inside
                                </div>
                            </div>
                        </div>

                        {/* Back (The Card) */}
                        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                            <AchievementCard achievement={achievement} className="w-full h-full" />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className={`flex gap-4 transition-opacity duration-500 ${isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <button 
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-bold transition-colors"
                    >
                        Dashboard
                    </button>
                    <button 
                        onClick={() => window.print()}
                        className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-black rounded-full font-bold transition-colors flex items-center gap-2"
                    >
                        <span>Print Card</span>
                    </button>
                </div>
            </div>

            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </div>
    );
};

export default RevealAchievement;
