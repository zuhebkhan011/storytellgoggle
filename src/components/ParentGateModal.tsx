import React, { useState, useEffect } from 'react';
import { Lock, X, Check, Shield } from 'lucide-react';

interface ParentGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ParentGateModal: React.FC<ParentGateModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [num1, setNum1] = useState(7);
  const [num2, setNum2] = useState(8);
  const [userAnswer, setUserAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      const a = Math.floor(Math.random() * 6) + 4; // 4 to 9
      const b = Math.floor(Math.random() * 6) + 4; // 4 to 9
      setNum1(a);
      setNum2(b);
      setUserAnswer('');
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sum = num1 + num2;
    if (parseInt(userAnswer.trim(), 10) === sum) {
      onSuccess();
      onClose();
    } else {
      setErrorMessage('Incorrect answer. Please try again or ask a parent.');
      setUserAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#e3f0f8] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f4faff] text-[#607080] hover:text-[#111d23] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#e5deff] flex items-center justify-center text-[#5c4bc3]">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-['Quicksand'] font-bold text-xl text-[#111d23]">
              Grown-Up Verification 🛡️
            </h3>
            <p className="text-xs text-[#607080]">
              To protect little adventurers, please solve this problem:
            </p>
          </div>
        </div>

        <div className="bg-[#FFF9EE] rounded-2xl p-4 text-center my-4 border border-[#FFD966]/40">
          <span className="text-xs font-bold text-[#607080] uppercase tracking-wider block mb-1">
            Parent Check
          </span>
          <p className="font-['Quicksand'] font-bold text-3xl text-[#006590]">
            {num1} + {num2} = ?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                setErrorMessage('');
              }}
              placeholder="Enter number..."
              className="w-full text-center font-bold text-2xl px-4 py-3 rounded-2xl bg-[#f4faff] border border-[#cfdce4] focus:outline-none focus:ring-2 focus:ring-[#006590] text-[#111d23]"
              autoFocus
            />
            {errorMessage && (
              <p className="text-xs text-[#ba1a1a] mt-2 text-center font-semibold">
                {errorMessage}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full bg-[#f4faff] text-[#607080] font-bold text-sm hover:bg-[#e9f6fd] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-full bg-[#006590] text-[#ffffff] font-bold text-sm shadow-[0_4px_0_#004c6e] hover:brightness-105 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Unlock</span>
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-[#f4faff] flex items-center justify-center gap-1.5 text-[11px] text-[#607080]">
          <Shield className="w-3.5 h-3.5 text-[#7DDCC8]" />
          <span>COPPA compliant &bull; 100% ad-free &bull; Zero tracking</span>
        </div>
      </div>
    </div>
  );
};
