import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';

export default function LessonQuiz({ quiz }) {
    const { t } = useLanguage();
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSubmit = () => {
        if (selectedOption === null) return;
        const correct = selectedOption === quiz.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);
    };

    const handleReset = () => {
        setSelectedOption(null);
        setShowResult(false);
    };

    return (
        <div className="my-16 p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <svg className="w-32 h-32 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                </svg>
            </div>

            <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
                    {t('curriculum_ui.quiz.badge') || 'Check de Conocimiento'}
                </span>
                
                <h3 className="text-2xl font-black text-white mb-8 leading-tight">
                    {quiz.question}
                </h3>

                <div className="space-y-4 mb-8">
                    {quiz.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => !showResult && setSelectedOption(index)}
                            disabled={showResult}
                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 group ${
                                showResult
                                    ? index === quiz.correctAnswer
                                        ? 'border-green-500/50 bg-green-500/10 text-green-400'
                                        : index === selectedOption
                                            ? 'border-red-500/50 bg-red-500/10 text-red-400'
                                            : 'border-white/5 opacity-50'
                                    : selectedOption === index
                                        ? 'border-blue-500/50 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/10'
                                        : 'border-white/5 hover:border-white/20 bg-white/5 hover:translate-x-2'
                            }`}
                        >
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                                selectedOption === index ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'
                            }`}>
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="font-medium text-lg">{option}</span>
                        </button>
                    ))}
                </div>

                {!showResult ? (
                    <button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                        className={`btn-3d w-full py-4 text-lg ${selectedOption === null ? 'opacity-50 cursor-not-allowed' : 'btn-3d-primary'}`}
                    >
                        {t('curriculum_ui.quiz.validate') || 'Validar Respuesta'}
                    </button>
                ) : (
                    <div className="animate-fade-in">
                        <div className={`p-6 rounded-2xl mb-6 ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                            <div className="flex items-center gap-3 mb-2">
                                {isCorrect ? (
                                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                ) : (
                                    <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                )}
                                <span className={`text-xl font-black ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                    {isCorrect ? (t('curriculum_ui.quiz.correct') || '¡Excelente!') : (t('curriculum_ui.quiz.wrong') || 'Casi lo logras')}
                                </span>
                            </div>
                            <p className="text-gray-300 font-medium">{quiz.explanation}</p>
                        </div>
                        <button
                            onClick={handleReset}
                            className="text-blue-500 font-bold hover:underline block mx-auto py-2"
                        >
                            {t('curriculum_ui.quiz.retry') || 'Intentar de nuevo'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
