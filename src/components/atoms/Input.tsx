'use client';

import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    id,
    className = '',
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <div className="flex flex-col gap-2 w-full group">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 group-focus-within:text-[#C5A059] transition-colors duration-500"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={inputId}
                    className={`
            w-full px-0 py-3 bg-transparent border-b text-white placeholder:text-white/10
            transition-all duration-700 focus:outline-none
            ${error
                            ? 'border-red-500/50 focus:border-red-500'
                            : 'border-white/10 focus:border-[#C5A059]'
                        }
            ${className}
          `}
                    {...props}
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-700 group-focus-within:w-full" />
            </div>
            {error && (
                <p className="text-[10px] uppercase tracking-widest text-red-500 mt-2 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
            {!error && helperText && (
                <p className="text-[10px] uppercase tracking-widest text-white/20 mt-2">
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default Input;
