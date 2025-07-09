import React, { useState, useCallback } from 'react';
import { PatientData } from './types';
import { INITIAL_PATIENT_DATA, BLANK_PATIENT_DATA } from './constants';
import { generateSummary } from './services/geminiService';
import PatientForm from './components/PatientForm';
import SummaryDisplay from './components/SummaryDisplay';

const Header: React.FC = () => (
  <header className="bg-white shadow-sm print-hide">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center space-x-3">
        <div className="bg-sky-600 p-2 rounded-lg">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
           </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">看護サマリー自動作成アプリ</h1>
      </div>
    </div>
  </header>
);

const Footer: React.FC = () => (
    <footer className="text-center py-4 text-slate-500 text-sm print-hide">
        <p>AI Nursing Summary Generator Prototype</p>
    </footer>
);

const LoadingIcon: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ViewToggle: React.FC<{ viewMode: 'input' | 'example'; setViewMode: (mode: 'input' | 'example') => void; }> = ({ viewMode, setViewMode }) => {
    const baseClasses = "w-1/2 px-6 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-200 focus:ring-sky-500";
    const activeClasses = "bg-sky-600 text-white shadow";
    const inactiveClasses = "bg-white text-slate-600 hover:bg-slate-100";

    return (
        <div className="flex items-center p-1 bg-slate-200 rounded-xl mb-6">
            <button onClick={() => setViewMode('input')} className={`${baseClasses} ${viewMode === 'input' ? activeClasses : inactiveClasses}`}>
                入力フォーム
            </button>
            <button onClick={() => setViewMode('example')} className={`${baseClasses} ${viewMode === 'example' ? activeClasses : inactiveClasses}`}>
                記入例
            </button>
        </div>
    );
};


const App: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientData>(BLANK_PATIENT_DATA);
  const [summaryBody, setSummaryBody] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'input' | 'example'>('input');

  const handleGenerateSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSummaryBody('');
    try {
      const dataToGenerate = viewMode === 'input' ? patientData : INITIAL_PATIENT_DATA;
      const aiGeneratedBody = await generateSummary(dataToGenerate);
      setSummaryBody(aiGeneratedBody);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [patientData, viewMode]);
  
  const displayData = viewMode === 'input' ? patientData : INITIAL_PATIENT_DATA;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 print-main-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start print-grid-wrapper">
            <div className="lg:sticky lg:top-8 print-hide">
                <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                {viewMode === 'input' ? (
                  <PatientForm data={patientData} setData={setPatientData} />
                ) : (
                  <fieldset disabled>
                    <PatientForm data={INITIAL_PATIENT_DATA} setData={() => {}} />
                  </fieldset>
                )}
            </div>
            
            <div className="flex flex-col space-y-6 print-summary-column">
                <div className="flex justify-center print-hide">
                    <button
                        onClick={handleGenerateSummary}
                        disabled={isLoading}
                        className="w-full md:w-auto flex items-center justify-center px-8 py-4 bg-sky-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                    >
                        {isLoading ? <LoadingIcon /> :  
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                            </svg>
                        }
                        {isLoading ? '生成中...' : 'AIでサマリーを生成'}
                    </button>
                </div>

                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md print-hide" role="alert">
                    <p className="font-bold">エラー</p>
                    <p>{error}</p>
                  </div>
                )}
                
                <SummaryDisplay 
                  patientData={displayData} 
                  summary={summaryBody} 
                  setSummary={setSummaryBody} 
                  isLoading={isLoading} 
                />
            </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default App;
