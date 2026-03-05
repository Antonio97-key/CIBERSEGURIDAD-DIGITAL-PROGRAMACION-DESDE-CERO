import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function QuizForm({ question, options, onComplete }) {
    const { register, handleSubmit } = useForm();
    const [feedback, setFeedback] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    const onSubmit = (data) => {
        if (data.answer === 'correcta') {
            setIsCorrect(true);
            setFeedback('¡Correcto! 🎉 Excelente trabajo.');
            setTimeout(() => onComplete(), 1500);
        } else {
            setIsCorrect(false);
            setFeedback('Incorrecto ❌ Intenta de nuevo.');
        }
    };

    return (
        <div className="mt-4 p-5 rounded-2xl bg-primary-50/50 dark:bg-primary-900/10 border border-primary-200/50 dark:border-primary-800/30">
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {question}
                </p>

                <div className="space-y-2 mb-4">
                    {options.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-graphite-700 border-2 border-transparent hover:border-primary-300 dark:hover:border-primary-600 cursor-pointer transition-all duration-200 group"
                        >
                            <input
                                type="radio"
                                value={option.value}
                                {...register('answer', { required: true })}
                                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>

                <button type="submit" className="btn-3d btn-3d-primary text-sm">
                    Verificar Respuesta
                </button>

                {/* Feedback */}
                {feedback && (
                    <div
                        className={`mt-4 p-3 rounded-xl text-sm font-medium animate-scale-in ${isCorrect
                                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/30'
                                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/30'
                            }`}
                    >
                        {feedback}
                    </div>
                )}
            </form>
        </div>
    );
}
