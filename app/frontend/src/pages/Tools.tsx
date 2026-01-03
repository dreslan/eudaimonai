import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const Tools: React.FC = () => {
  const baseUrl = window.location.origin;
  const newQuestUrl = `${baseUrl}/quests/new`;
  const newAchievementUrl = `${baseUrl}/achievements/new`;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dcc-card shadow rounded-lg p-6 border dark:border-dcc-system/20">
        <h1 className="text-2xl font-bold mb-6 dark:text-dcc-system">Tools & QR Codes</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Print these QR codes and attach them to your physical achievement box for quick access.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-orange-600 dark:text-dcc-system">New Quest</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <QRCodeSVG value={newQuestUrl} size={200} />
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-mono">{newQuestUrl}</p>
            <button 
                onClick={() => window.print()}
                className="mt-6 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
            >
                Print Page
            </button>
          </div>

          <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">New Achievement</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <QRCodeSVG value={newAchievementUrl} size={200} />
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-mono">{newAchievementUrl}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-dcc-card shadow rounded-lg p-6 border dark:border-dcc-system/20">
          <h2 className="text-xl font-bold mb-4 dark:text-dcc-system">Data Export</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Download a copy of all your data.</p>
          <button 
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 dark:bg-dcc-system dark:text-black dark:hover:bg-orange-400"
            onClick={() => {
                // Simple download trigger
                window.open('http://localhost:8000/quests', '_blank');
            }}
          >
              Download Quests JSON
          </button>
      </div>

      <div className="bg-white dark:bg-dcc-card shadow rounded-lg p-6 border-l-4 border-red-500 dark:border-red-600">
          <h2 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">Danger Zone</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Permanently delete all quests and achievements. This cannot be undone.</p>
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            onClick={async () => {
                if (window.confirm("Are you sure you want to delete ALL data? This cannot be undone.")) {
                    try {
                        const response = await fetch('http://localhost:8000/reset', { method: 'POST' });
                        if (response.ok) {
                            alert("Data reset successfully.");
                            window.location.reload();
                        } else {
                            alert("Failed to reset data.");
                        }
                    } catch (error) {
                        console.error("Error resetting data:", error);
                        alert("Error resetting data.");
                    }
                }
            }}
          >
              Reset All Data
          </button>
      </div>
    </div>
  );
};

export default Tools;
