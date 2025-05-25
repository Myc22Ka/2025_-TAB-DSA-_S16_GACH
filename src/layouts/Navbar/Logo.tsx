import React from 'react';
import LogoImg from '@/assets/react.svg';

const Logo: React.FC = () => {
    return (
        <div className="flex items-center space-x-3">
            <img src={LogoImg} alt="Logo Aquaparku" className="h-8 w-auto" />
            <span className="text-lg font-semibold tracking-tight text-blue-600">AquaPark</span>
        </div>
    );
};

export default Logo;
