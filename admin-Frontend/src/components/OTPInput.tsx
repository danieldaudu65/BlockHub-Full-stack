import React, { useState, useRef, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

interface OTPInputProps {
    length?: number;
    onComplete?: (otp: string) => void;
    isError?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 5, onComplete, isError = false }) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value.replace(/[^a-zA-Z0-9]/g, '');
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }

            if (newOtp.every(digit => digit !== "")) {
                onComplete?.(newOtp.join(''));
            }
        }
    };

    const handleBackspace = (element: HTMLInputElement, index: number) => {
        if (element.value === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {otp.map((data, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => {
                        if (e.key === 'Backspace') handleBackspace(e.currentTarget, index);
                    }}
                    ref={el => {
                        if (el) inputRefs.current[index] = el;
                        else inputRefs.current[index] = null;
                    }} style={{
                        width: '50px',
                        height: '50px',
                        textAlign: 'center',
                        color: 'white',
                        marginRight: '10px',
                        marginBottom: '10px',
                        fontSize: '20px',
                        border: isError ? '1px solid red' : '1px solid #ddd',
                        borderRadius: '5px',
                        outline: 'none'
                    }}
                />
            ))}
        </div>
    );
};

export default OTPInput;
