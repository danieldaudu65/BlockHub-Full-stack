import React from 'react';

interface ButtonProps {
    text: string;
    bg: boolean
}

const Button: React.FC<ButtonProps> = ({ text, bg }) => {
    return (
        <button className={`text-secondary-main text-[12px] font-semibold ${bg ? 'bg-faded-gray' : ''}    rounded-md cursor-pointer`}>
            {text}
        </button>
    );
};

export default Button;
