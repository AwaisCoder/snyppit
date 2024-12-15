import React, { useState } from 'react';

interface PromptModalProps {
    isOpen: boolean;
    message: string;
    onSubmit: (input: string) => void;
    onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ isOpen, message, onSubmit, onClose }) => {
    const [userInput, setUserInput] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit(userInput);
        setUserInput('');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="text-lg font-medium mb-2">{message}</div>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                />
                <div className="flex gap-2 justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default PromptModal;
