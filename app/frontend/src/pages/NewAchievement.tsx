import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { AchievementCreate, Quest } from '../types';

const NewAchievement: React.FC = () => {
  const navigate = useNavigate();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [formData, setFormData] = useState<AchievementCreate>({
    title: '',
    context: '',
    dimension: 'intellectual',
    date_completed: new Date().toISOString().split('T')[0],
    quest_id: ''
  });

  useEffect(() => {
    const fetchQuests = async () => {
        try {
            const res = await axios.get('http://localhost:8000/quests');
            setQuests(res.data.filter((q: Quest) => q.status !== 'completed'));
        } catch (error) {
            console.error("Error fetching quests", error);
        }
    };
    fetchQuests();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'quest_id') {
        const selectedQuest = quests.find(q => q.id === value);
        setFormData(prev => ({ 
            ...prev, 
            [name]: value,
            dimension: selectedQuest ? selectedQuest.dimension : prev.dimension
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/achievements', formData);
      navigate('/');
    } catch (error) {
      console.error("Error creating achievement", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-pulse">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 uppercase tracking-widest transform -rotate-2">
                New Achievement!
            </h1>
        </div>

        <div className="bg-white dark:bg-dcc-card shadow-xl rounded-lg p-8 border-t-4 border-yellow-400 dark:border-dcc-gold">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                    type="text"
                    name="title"
                    required
                    placeholder="What did you accomplish?"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2 border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Context (The Story)</label>
                <textarea
                    name="context"
                    rows={3}
                    required
                    placeholder="Describe what happened. The AI will judge you based on this."
                    value={formData.context}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2 border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Linked Quest (Optional)</label>
                    <select
                        name="quest_id"
                        value={formData.quest_id}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2 border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">-- None --</option>
                        {quests.map(q => (
                            <option key={q.id} value={q.id}>{q.title}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dimension</label>
                    <select
                    name="dimension"
                    value={formData.dimension}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2 border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    >
                    {['intellectual', 'physical', 'financial', 'environmental', 'vocational', 'social', 'emotional', 'spiritual'].map(d => (
                        <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                    ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date Completed</label>
                    <input
                    type="date"
                    name="date_completed"
                    value={formData.date_completed}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2 border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                </div>
                </div>

                <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transform transition hover:scale-105"
                >
                CLAIM GLORY
                </button>
            </form>
        </div>
    </div>
  );
};

export default NewAchievement;
