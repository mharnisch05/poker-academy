'use client';

import { HAND_RANKINGS, getHandStrengthDescription, HandRank } from '@/lib/poker';

export default function HandRankings() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Poker Hand Rankings</h2>
      <p className="text-gray-600 mb-6">
        Hands are ranked from strongest to weakest. In a showdown, the player with the highest-ranking hand wins the pot.
      </p>
      
      <div className="space-y-4">
        {HAND_RANKINGS.map((rank, index) => (
          <div 
            key={rank} 
            className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-blue-600">#{index + 1}</span>
                  <h3 className="text-xl font-semibold text-gray-800">{rank}</h3>
                </div>
                <p className="text-gray-600 mt-2 ml-12">{getHandStrengthDescription(rank)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
