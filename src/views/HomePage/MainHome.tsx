import React from 'react';

const MainHome: React.FC = () => {
    return (
        <div className="w-full px-6 md:px-12 lg:px-24">
            <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-4xl font-kanchenjunga font-bold text-gray-900 dark:text-white mb-4">Witamy!</h1>
                <p className="text-lg font-kanchenjunga text-gray-700 dark:text-gray-300">Twoja przygoda zaczyna się tutaj.</p>
            </div>
        </div>
    );
};

export default MainHome;
