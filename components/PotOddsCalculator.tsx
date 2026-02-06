'use client';

import { useState } from 'react';
import { calculatePotOdds } from '@/lib/poker';

export default function PotOddsCalculator() {
  const [potSize, setPotSize] = useState<number>(100);
  const [betToCall, setBetToCall] = useState<number>(20);
  
  const potOdds = calculatePotOdds(potSize, betToCall);
  const potOddsPercentage = (potOdds * 100).toFixed(1);
  const potOddsRatio = `${betToCall}:${potSize}`;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Pot Odds Calculator</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Pot Size: ${potSize}
          </label>
          <input
            type="range"
            min="10"
            max="500"
            value={potSize}
            onChange={(e) => setPotSize(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="number"
            value={potSize}
            onChange={(e) => setPotSize(Number(e.target.value))}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bet to Call: ${betToCall}
          </label>
          <input
            type="range"
            min="5"
            max="200"
            value={betToCall}
            onChange={(e) => setBetToCall(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="number"
            value={betToCall}
            onChange={(e) => setBetToCall(Number(e.target.value))}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Results:</h3>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Pot Odds:</span> {potOddsPercentage}%
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Ratio:</span> {potOddsRatio}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Total Pot if You Call:</span> ${potSize + betToCall}
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-sm text-gray-600">
              💡 <strong>Tip:</strong> You need to win at least {potOddsPercentage}% of the time to make calling profitable.
              If your hand equity is higher than this percentage, calling is a good decision!
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Understanding Pot Odds:</h4>
          <p className="text-sm text-gray-600">
            Pot odds compare the current size of the pot to the cost of a call. They help you decide 
            whether calling a bet is mathematically profitable. Compare your pot odds to your hand's 
            equity (chance of winning) to make informed decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
