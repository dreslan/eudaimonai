import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const Tools: React.FC = () => {
  const baseUrl = window.location.origin;
  const newQuestUrl = `${baseUrl}/quests/new`;
  const newAchievementUrl = `${baseUrl}/achievements/new`;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Tools & QR Codes</h1>
        <p className="text-gray-600 mb-8">Print these QR codes and attach them to your physical achievement box for quick access.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-indigo-600">New Quest</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <QRCodeSVG value={newQuestUrl} size={200} />
            </div>
            <p className="mt-4 text-sm text-gray-500 font-mono">{newQuestUrl}</p>
            <button 
                onClick={() => window.print()}
                className="mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
            >
                Print Page
            </button>
          </div>

          <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-green-600">New Achievement</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <QRCodeSVG value={newAchievementUrl} size={200} />
            </div>
            <p className="mt-4 text-sm text-gray-500 font-mono">{newAchievementUrl}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Data Export</h2>
          <p className="text-gray-600 mb-4">Download a copy of all your data.</p>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => {
                // Simple download trigger
                window.open('http://localhost:8000/quests', '_blank');
            }}
          >
              Download Quests JSON
          </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6 border-l-4 border-red-500">
          <h2 className="text-xl font-bold mb-4 text-red-600">Danger Zone</h2>
          <p className="text-gray-600 mb-4">Permanently delete all quests and achievements. This cannot be undone.</p>
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
