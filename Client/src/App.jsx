import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import StatusViewer from './components/StatusViewer';
import { Bot } from 'lucide-react';

function App() {
  const [currentJobId, setCurrentJobId] = useState(null);
  const [appError, setAppError] = useState(null);

  const handleJobCreated = (jobId) => {
    setAppError(null);
    setCurrentJobId(jobId);
  };

  const handleReset = () => {
    setCurrentJobId(null);
    setAppError(null);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-white flex flex-col items-center py-12 px-4 font-sans">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-600/10 rounded-2xl mb-4 ring-1 ring-blue-500/20">
          <Bot className="text-blue-500" size={32} />
        </div>
        <h1 className="text-5xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          AnyLanguage Caption
        </h1>
        <p className="text-gray-400 text-lg">Offline Video Transcription & Transliteration Engine</p>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex justify-center">
        {appError && (
             <div className="mb-6 p-4 bg-red-900/50 text-red-200 rounded-lg border border-red-800 max-w-md w-full">
                {appError}
             </div>
        )}

        {!currentJobId ? (
            <UploadForm 
                onJobCreated={handleJobCreated} 
                onError={setAppError} 
            />
        ) : (
            <StatusViewer 
                jobId={currentJobId} 
                onReset={handleReset} 
            />
        )}
      </div>

    </div>
  );
}

export default App;
