'use client';

import { Card as CardType } from '@/lib/poker';

interface CardProps {
  card: CardType;
  faceDown?: boolean;
  className?: string;
}

export default function Card({ card, faceDown = false, className = '' }: CardProps) {
  const isRed = card.suit === '♥' || card.suit === '♦';
  
  if (faceDown) {
    return (
      <div className={`w-20 h-28 bg-blue-800 border-2 border-blue-900 rounded-lg flex items-center justify-center shadow-lg overflow-hidden ${className}`}>
        <div className="text-3xl text-blue-400">🂠</div>
      </div>
    );
  }
  
  return (
    <div className={`w-20 h-28 bg-white border-2 border-gray-300 rounded-lg p-1.5 flex flex-col justify-between shadow-lg overflow-hidden ${className}`}>
      <div className={`flex flex-col items-start leading-none ${isRed ? 'text-red-600' : 'text-black'}`}>
        <span className="text-lg font-bold">{card.rank}</span>
        <span className="text-xl -mt-0.5">{card.suit}</span>
      </div>
      <div className={`flex flex-col items-end leading-none ${isRed ? 'text-red-600' : 'text-black'} transform rotate-180`}>
        <span className="text-lg font-bold">{card.rank}</span>
        <span className="text-xl -mt-0.5">{card.suit}</span>
      </div>
    </div>
  );
}
